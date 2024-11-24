import { useEffect } from "react"
import { MESSAGES } from "../utils/constants"

const MailForm = ({ formIndex, totalSteps, prevForm, data, nextForm, radioButtonSelected, setData }) => {

    useEffect(() => {
        if (radioButtonSelected.option !== "CUSTOM") {
            setData({
                MAIL: {
                    [radioButtonSelected.option]: {
                        subject: MESSAGES[radioButtonSelected.option].MAIL.subject,
                        message: MESSAGES[radioButtonSelected.option].MAIL.message
                    }
                }
            }
            )
        }
        else {
            setData({
                ...data,
                MAIL: {
                    [radioButtonSelected.option]: {
                        subject: "",
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
            ...data, MAIL: {
                CUSTOM: {
                    ...data.MAIL.CUSTOM,
                    [name]: value
                }
            }
        })
    }


    const _handlePrevBtn = () => {
        const {MAIL, ...dataRest} = data
        setData(dataRest)
        prevForm()
    }

    const _console = (e) => {
        e.preventDefault()
        console.log(data)
    }

    return (
        <>
            <h2>Correo electronico</h2>
            {
                radioButtonSelected.option === "INVITATION" &&
                <>
                    <label htmlFor="">Asunto</label>
                    <input type="text" name="subject" id="" value={MESSAGES.INVITATION.MAIL.subject} readOnly={true} />
                    <label>Mensaje</label>
                    <textarea name="message" readOnly={true} rows={8} cols={33} id="" value={MESSAGES.INVITATION.MAIL.message} />
                </>
            }
            {
                radioButtonSelected.option === "REMINDER" &&
                <>
                    <label htmlFor="">Asunto</label>
                    <input type="text" name="" id="" readOnly={true} value={MESSAGES.REMINDER.MAIL.subject} />
                    <label>Mensaje</label>
                    <textarea name="message"  readOnly={true} rows={8} cols={33} id="" value={MESSAGES.REMINDER.MAIL.message} />
                </>
            }
            {
                radioButtonSelected.option === "CUSTOM" &&
                <>
                    <label htmlFor="">Asunto</label>
                    <input type="text" onChange={_handleChange} name="subject" id="" placeholder="Escribe"/>
                    <label>Mensaje</label>
                    <textarea name="message" placeholder="Escribe" onChange={_handleChange} rows={8} cols={33} id="" />
                </>
            }
            <button onClick={_handlePrevBtn}>Atras</button>
            {formIndex === totalSteps ?
                <button onClick={_console}>Enviar</button> :
                <button disabled={Object.keys(data.MAIL).length === 0 && data.MAIL.constructor === Object} onClick={nextForm}>Siguiente</button>
            }
        </>
    )
}

export default MailForm