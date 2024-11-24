import { useEffect } from "react"
import { MESSAGES } from "../utils/constants"

const WhatsappForm = ({ formIndex, totalSteps, prevForm, data, nextForm, radioButtonSelected, setData }) => {

    useEffect(() => {
        if (radioButtonSelected.option !== "CUSTOM") {
            setData({
                ...data,
                WHATSAPP: {
                    [radioButtonSelected.option]: {
                        message: MESSAGES[radioButtonSelected.option].WHATSAPP.message
                    }
                }
            }
            )
        }
        else {
            setData({
                ...data,
                WHATSAPP: {
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
            ...data, WHATSAPP: {
                CUSTOM: {
                    ...data.WHATSAPP.CUSTOM,
                    [name]: value
                }
            }
        })
    }

    const _handlePrevBtn = () => {
        const {WHATSAPP, ...dataRest} = data
        setData(dataRest)
        prevForm()
    }

    const _console = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(data))
    }


    return (
        <>
            <h2>Whatsapp</h2>
            {
                radioButtonSelected.option === "INVITATION" &&
                <>
                    <label>Mensaje</label>
                    <textarea name="message" readOnly={true} rows={8} cols={33} id="" value={MESSAGES.INVITATION.WHATSAPP.message} />
                </>
            }
            {
                radioButtonSelected.option === "REMINDER" &&
                <>
                    <label>Mensaje</label>
                    <textarea name="message" rows={8} readOnly={true} cols={33} id="" value={MESSAGES.REMINDER.WHATSAPP.message} />
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

export default WhatsappForm