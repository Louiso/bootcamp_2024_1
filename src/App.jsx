import React, { useState } from "react";
import "./App.css"
import ComponentTipo from "./components/componentTipo";
import ComponentCanal from "./components/componentCanal";
import ComponentMensaje from "./components/componentMensaje";
import ComponentFinal from "./Components/componentFinal";

const App = () => {
  const [step, setStep] = useState(0); 
  const [messageType, setMessageType] = useState(""); 
  const [channels, setChannels] = useState([]); 
  const [messages, setMessages] = useState({}); 

  const handleCancel = () => {
    setStep(0);
    setMessageType("");
    setChannels([]);
    setMessages({});
  };

  const handleNext = (data) => {
    if (step === 1) setMessageType(data); 
    if (step === 2) setChannels(data); 
    if (step === 3) setMessages(data); 
    setStep(step + 1); 
  };

  const handleSubmit = () => {
    const finalData = {
      tipoMensaje: messageType,
      canales: channels,
      mensajes: messages,
    };
    console.log("Datos finales enviados:", JSON.stringify(finalData, null, 2));
    alert("¡Datos enviados correctamente!");
    handleCancel(); 
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Flujo de Envío de Mensajes</h1>
      {step === 0 && (
        <button
          onClick={() => setStep(1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enviar Mensaje
        </button>
      )}
      {step === 1 && (
        <ComponentTipo
          onNext={handleNext}
          onCancel={handleCancel}
        />
      )}
      {step === 2 && (
        <ComponentCanal
          onNext={handleNext}
          onCancel={handleCancel}
        />
      )}
      {step === 3 && (
        <ComponentMensaje
          channels={channels}
          onSubmit={handleNext}
          onCancel={handleCancel}
        />
      )}
      {step === 4 && (
        <ComponentFinal
          data={{
            tipoMensaje: messageType,
            canales: channels,
            mensajes: messages,
          }}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default App;