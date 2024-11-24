import { useEffect } from "react"
import { MESSAGES } from "../utils/constants"

const TextmessageForm = ({ formIndex, totalSteps, prevForm, data, nextForm, radioButtonSelected, setData }) => {

    useEffect(() => {
        if (radioButtonSelected.option !== "CUSTOM") {
            setData({
                ...data,
                TEXTMESSAGE: {
                    [radioButtonSelected.option]: {
                        message: MESSAGES[radioButtonSelected.option].TEXTMESSAGE.message
                    }
                }
            }
            )
        }
        else {
            setData({
                ...data,
                TEXTMESSAGE: {
                    [radioButtonSelected.option]: {
                        message: ""
                    }
                }
            }
            )
        }
    }, [])

    const _handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data, TEXTMESSAGE: {
                CUSTOM: {
                    ...data.TEXTMESSAGE.CUSTOM,
                    [name]: value
                }
            }
        })
    }

    const _handlePrevBtn = () => {
        const {TEXTMESSAGE, ...dataRest} = data
        setData(dataRest)
        prevForm()
    }

    const _console = (e) => {
        e.preventDefault()
        console.log(data)
    }


    return (
        <>
            <h2>Mensaje de Texto</h2>
            {
                radioButtonSelected.option === "INVITATION" &&
                <>
                    <label>Mensaje</label>
                    <textarea name="message" readOnly={true} rows={8} cols={33} id="" value={MESSAGES.INVITATION.TEXTMESSAGE.message} />
                </>
            }
            {
                radioButtonSelected.option === "REMINDER" &&
                <>
                    <label>Mensaje</label>
                    <textarea name="message" rows={8} readOnly={true} cols={33} id="" value={MESSAGES.REMINDER.TEXTMESSAGE.message} />
                </>
            }
            {
                radioButtonSelected.option === "CUSTOM" &&
                <>
                    <label>Mensaje</label>
                    <textarea name="message" onChange={_handleChange} placeholder="Escribe" rows={8} cols={33} id="" />
                </>
            }
            <button onClick={_handlePrevBtn}>Atras</button>
            {formIndex === totalSteps ?
                <button onClick={_console}>Enviar</button> :
                <button onClick={nextForm}>Siguiente</button>
            }
        </>
    )
}

export default TextmessageForm