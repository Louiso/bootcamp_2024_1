import React, { useState } from "react";
import CardTypeMessage from "./components/CardTypeMessage";
import EmailForm from "./components/EmailForm";
import { messagesByType, messageChannels } from "./utils/constants";

function App() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]); // Estado para los valores seleccionados
  const [index, setIndex] = useState(0);
  const [customSubject, setCustomSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleSelectedTypes = (types) => {
    setSelectedTypes(types); // Actualiza el estado con los datos recibidos
    setShowEmailForm(true);
    setIndex(0);
  };

  const [typeId, ...selectedChannels] = selectedTypes;
  const messageStructure = messagesByType[typeId];
  const currentChannel = selectedChannels[index];

  // si currentChannel is equal to "email", show messageStructure.channelsMessages.email
  // caso contrario, show messageStructure.channelsMessages.other
  const messageByChannel =
    currentChannel === "email"
      ? messageStructure?.channelsMessages.email
      : messageStructure?.channelsMessages.other;

  const title = messageChannels.find(
    (channel) => channel.id === currentChannel
  )?.label;

  // navegación entre canales
  const handleNextChannel = () => {
    if (index < selectedChannels.length - 1) {
      setIndex((prevIndex) => prevIndex + 1); // Avanza al siguiente canal
    } else {
      setShowEmailForm(false); // Oculta el formulario si ya no hay más canales
    }
  };

  const handleSubmit = () => {
    const dataToSend = {
      typeId,
      channels: selectedChannels.map((channel) => {
        const isEmail = channel === "email";
        return {
          channel,
          subject: isEmail ? customSubject : null,
          message: customMessage || messagesByType[typeId]?.message,
        };
      }),
    };

    console.log("Datos enviados:", JSON.stringify(dataToSend, null, 2));
    alert("Datos enviados a la consola.");
  };

  return (
    <div className="container">
      {showEmailForm && selectedChannels[index] ? (
        <EmailForm
          showSubject={messageByChannel.showSubject}
          subject={messageByChannel.subject}
          message={messageStructure.message}
          title={title}
          isLastShowedForm={index === selectedChannels.length - 1} // True si es el último canal
          onNext={handleNextChannel}
          onSubmit={handleSubmit}
          onSubjectChange={setCustomSubject} // Nueva prop
          onMessageChange={setCustomMessage} // Nueva prop
        />
      ) : (
        <CardTypeMessage onSelectedTypes={handleSelectedTypes} />
      )}
    </div>
  );
}

export default App;
