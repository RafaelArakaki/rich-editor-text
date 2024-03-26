import React, {
  useEffect, useState,
} from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  EditorState,
  $insertNodes,
  LexicalEditor,
} from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { mergeRegister } from '@lexical/utils';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import {
  $generateHtmlFromNodes,
  $generateNodesFromDOM,
} from '@lexical/html';

import styles from './styles.module.css';
import ButtonEditor from '../Button';

interface OnChangePluginProps {
  onChange: (editorState: EditorState) => void;
}

const htmlString = (html: string) => html.split('"').join("'");

const OnChangePlugin: React.FC<OnChangePluginProps> = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => editor.registerUpdateListener(({ editorState }) => {
    onChange(editorState);
  }), [editor, onChange]);

  return null;
};

interface HtmlPluginProps {
  onHtmlChanged: (html: string) => void;
}

const HtmlPlugin: React.FC<HtmlPluginProps> = ({ onHtmlChanged }) => {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isListUl, setIsListUl] = useState<boolean>(false);
  const [isListOl, setIsListOl] = useState<boolean>(false);

  /* eslint-disable */
  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  useEffect(() => {
    if (isListUl) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [isListUl]);

  useEffect(() => {
    if (isListOl) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [isListOl]);
  /* eslint-enable */

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    }),
  ), [updateToolbar, editor]);

  return (
    <div className={styles.toolbar}>
      <ButtonEditor
        className={isBold ? styles.bg_grey : styles.bg_transparent}
        callbackCommand={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        iconName="format_bold"
        dataTestid="button-bold"
      />
      <ButtonEditor
        className={isItalic ? styles.bg_grey : styles.bg_transparent}
        callbackCommand={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        iconName="format_italic"
        dataTestid="button-italic"
      />
      <ButtonEditor
        className={isUnderline ? styles.bg_grey : styles.bg_transparent}
        callbackCommand={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        iconName="format_underlined"
        dataTestid="button-underline"
      />
      <ButtonEditor
        className={isListUl ? styles.bg_grey : styles.bg_transparent}
        callbackCommand={() => setIsListUl((prevstate) => !prevstate)}
        iconName="format_list_bulleted"
        dataTestid="button-list-bullet"
      />
      <ButtonEditor
        className={isListOl ? styles.bg_grey : styles.bg_transparent}
        callbackCommand={() => setIsListOl((prevstate) => !prevstate)}
        iconName="format_list_numbered"
        dataTestid="button-list-number"
      />
      <ButtonEditor
        callbackCommand={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        iconName="format_align_left"
        dataTestid="button-align-left"
      />
      <ButtonEditor
        callbackCommand={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        iconName="format_align_center"
        dataTestid="button-align-center"
      />
      <ButtonEditor
        callbackCommand={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
        iconName="format_align_justify"
        dataTestid="button-align-justify"
      />
      <ButtonEditor
        callbackCommand={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        iconName="format_align_right"
        dataTestid="button-align-right"
      />

    </div>
  );
};

type TextEditorProps = {
  stateText: string,
  onChangeText: (e: string) => void
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { stateText, onChangeText } = props;

  const initialConfig = {
    namespace: 'MyEditor',
    theme: {
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
      },
    },
    onError(error: Error) {
      throw error;
    },
    nodes: [ListNode, ListItemNode],
    editorState: (editor: LexicalEditor) => {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(stateText, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        $insertNodes(nodes);
      });
    },
  };

  return (
    <div className={styles.container_editor}>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
        <ListPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.contentEditable} data-testid="textarea-editor" />
          }
          placeholder={<div className={styles.placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HtmlPlugin onHtmlChanged={(e) => onChangeText(htmlString(e))} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};

export default TextEditor;
