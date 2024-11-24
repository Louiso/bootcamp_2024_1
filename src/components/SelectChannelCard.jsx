import { Fragment } from 'react'
import { messagesChannels } from '../utils/constants'

function SelectChannelCard({ nextForm, formData, setFormData, prevForm }) {

    const isNextEnabled = formData.MAIL.value || formData.TEXTMESSAGE.value || formData.WHATSAPP.value;

    const _handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({...formData, [name]: {...formData[name], value: checked}
        })
    }
    return (
        <>
            <h2>Seleccion de tipo de mensaje</h2>
            <form>
                <fieldset>
                    {messagesChannels.map((item) => {
                        return (
                            <Fragment key={item.index}>
                                <input type="checkbox" name={item.type} value={item.type} onChange={_handleChange} checked={formData[item.type].value}/>
                                <label>{item.text}</label>
                            </Fragment>)
                    }
                    )
                    }
                    <button onClick={prevForm}>Atras</button>
                    <button disabled={!isNextEnabled} onClick={nextForm}>Siguiente</button>
                </fieldset>
            </form>
        </>
    )
}

export default SelectChannelCard