
import { useState } from 'react'
import TextEditor from './components/TextEditor'

function App() {
  const [descriptionText, setDescriptionText] = useState<string>('');

  const onChangeDescription = (e: string) => {
    setDescriptionText(e);
  }

  return (
    <>
      <TextEditor
        stateText={descriptionText}
        onChangeText={onChangeDescription}
      />
    </>
  )
}

export default App
