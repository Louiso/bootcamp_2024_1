import { useState, Fragment } from 'react'
import { typeOfMessages } from '../utils/constants'

function SelectMessageCard({ nextForm, radioButtonSelected, setRadioButtonSelected }) {
    const _handleChange = (e) => {
        setRadioButtonSelected({
            option: e.target.value
        })
    }
    return (
        <>
            <h2>Seleccion de tipo de mensaje</h2>
            <form>
                <fieldset>
                    {typeOfMessages.map((item) => {
                        return (
                            <Fragment key={item.index}>
                                <input type="radio" name="message" value={item.type} onChange={_handleChange} checked={radioButtonSelected.option === item.type} />
                                <label>{item.text}</label>
                            </Fragment>)
                    }
                    )
                    }
                    <button>Cancelar</button>
                    <button disabled={!radioButtonSelected.option} onClick={nextForm}>Siguiente</button>
                </fieldset>
            </form>
        </>
    )
}

export default SelectMessageCard