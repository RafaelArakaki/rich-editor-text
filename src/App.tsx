
import { useState } from 'react'
import TextEditor from './components/TextEditor'

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
    </div>
  )
}

export default App
