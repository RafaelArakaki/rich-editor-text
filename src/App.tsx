
import { useState } from 'react';
import TextEditor from './components/TextEditor';
import styles from './styles.module.css';

function App() {
  const [descriptionText, setDescriptionText] = useState<string>('');

  const onChangeDescription = (e: string) => {
    setDescriptionText(e);
  }

  return (
    <div className="container">
      <TextEditor
        stateText={descriptionText}
        onChangeText={onChangeDescription}
      />
      <div className={styles.blackboard}>
        {descriptionText}
      </div>
    </div>
  )
}

export default App
