import { useState } from 'react'
import SelectMessageCard from './components/SelectMessageCard'
import SelectChannelCard from './components/SelectChannelCard'
import Form from './components/Form'

function App() {
  const [formIndex, setFormIndex] = useState(1)
  const [formData, setFormData] = useState(
    {
      MAIL: {
        index: 1,
        value: false
      },
      TEXTMESSAGE: {
        index: 2,
        value: false
      },
      WHATSAPP: {
        index: 3,
        value: false
      }
    }
  )

  const [radioButtonSelected, setRadioButtonSelected] = useState({
    option: ""
  })

  const checkboxSteps = [
    formData.MAIL.value && "MAIL",
    formData.TEXTMESSAGE.value && "TEXTMESSAGE",
    formData.WHATSAPP.value && "WHATSAPP",
  ].filter(Boolean);

  const totalSteps = 2 + checkboxSteps.length
  
  const nextForm = () => {
    setFormIndex((prev) => prev + 1)
  }

  const prevForm = () => {
    setFormIndex((prev) => prev - 1)
  }
  
  return (
    <>
      {formIndex == 1 && 
      <SelectMessageCard nextForm={nextForm} radioButtonSelected={radioButtonSelected} setRadioButtonSelected={setRadioButtonSelected} />}

      {formIndex == 2 && 
      <SelectChannelCard nextForm={nextForm} prevForm={prevForm} formData={formData} setFormData={setFormData} />}

      {formIndex > 2 && formIndex <= 2 + checkboxSteps.length && 
      (<Form nextForm={nextForm} formData={formData} radioButtonSelected={radioButtonSelected} prevForm={prevForm} checkboxName={checkboxSteps[formIndex - 3]} formIndex={formIndex} totalSteps={totalSteps} />)}

    </>
  )
}

export default App
