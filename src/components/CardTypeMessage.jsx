import React, { useState, useEffect } from "react";
import MessageTypeButton from "/src/components/MessageTypeButton";
import ActionButtons from "/src/components/ActionButton";
import "/src/index.css"; // Importa los estilos
import { messageTypes, messageChannels } from "/src/utils/constants";

function CardTypeMessage({ setShowEmailForm, onSelectedTypes }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [title, setTitle] = useState("Seleccion de tipo de mensaje");
  const [inputType, setInputType] = useState("radio");
  const [currentArray, setCurrentArray] = useState("messageTypes");

  const _handleNext = () => {
    if (currentArray === "messageTypes") {
      // Si estamos seleccionando tipo de mensaje
      const selectedValue = selectedTypes[0]; // Solo hay uno seleccionado en modo "radio"
      if (selectedValue) {
        const selectedMessage = messageTypes.find(
          (message) => message.id === selectedValue
        );
        console.log("Mensaje seleccionado:", selectedMessage?.label);
      }
      // Cambiar al siguiente paso
      setTitle("Selección de Canales");
      setInputType("checkbox");
      setCurrentArray("messageChannels");
    } else {
      // Aquí podrías manejar la lógica de la selección de canales
      console.log("Canales seleccionados:", selectedTypes); // ["invitation", "email", "wsp"]
      onSelectedTypes(selectedTypes);
    }
  };

  const toggleSelection = (id) => {
    if (inputType === "checkbox") {
      // Para checkboxes: añade o quita el id del arreglo
      setSelectedTypes((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      // Para radios: solo permite un valor
      setSelectedTypes([id]);
    }
  };

  const dataToPlay =
    currentArray === "messageTypes" ? messageTypes : messageChannels;

  return (
    <div className="card">
      <h1 className="title">{title}</h1>

      <div className="message-types">
        {dataToPlay.map((message) => (
          <MessageTypeButton
            key={message.id}
            message={message}
            isSelected={selectedTypes.includes(message.id)}
            onClick={toggleSelection}
            inputType={inputType}
          />
        ))}
      </div>

      <ActionButtons onNext={_handleNext} />
    </div>
  );
}

export default CardTypeMessage;
