import { useState } from "react"
import MailForm from "./MailForm";
import TextmessageForm from "./TextmessageForm";
import WhatsappForm from "./WhatsappForm";

const Form = ({ checkboxName, radioButtonSelected, nextForm, prevForm, formIndex, totalSteps, sendData }) => {
    const [data, setData] = useState({
        [checkboxName]: {
        }
    })
    return (
        <>
            {

                <form>
                    {checkboxName === "MAIL" &&
                        <MailForm
                        formIndex={formIndex} prevForm={prevForm}
                        totalSteps={totalSteps} sendData={sendData}
                        nextForm={nextForm} radioButtonSelected={radioButtonSelected}
                        data={data} setData={setData}
                        />
                    }

                </form>

            }
            {
                checkboxName === "TEXTMESSAGE" && (
                    <TextmessageForm
                        formIndex={formIndex} prevForm={prevForm}
                        totalSteps={totalSteps} sendData={sendData}
                        nextForm={nextForm} radioButtonSelected={radioButtonSelected}
                        data={data} setData={setData}
                        />)
            }
            {
                checkboxName === "WHATSAPP" && (
                    <WhatsappForm
                        formIndex={formIndex} prevForm={prevForm}
                        totalSteps={totalSteps} sendData={sendData}
                        nextForm={nextForm} radioButtonSelected={radioButtonSelected}
                        data={data} setData={setData}
                        />)
            }
        </>
    )
}

export default Form