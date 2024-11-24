import { Button, Form } from "react-bootstrap";
import { MessageType } from "../constants";
import { useState } from "react";

export default function MessageTypeSelection({
  messageData,
  setMessageData,
  nextStep,
  prevStep,
}) {
  const [messageType, setMessageType] = useState("");

  const handleChange = (type) => {
    setMessageType(type);
  };

  const handleClick = () => {
    setMessageData({ ...messageData, type: messageType });
    nextStep();
  };

  return (
    <>
      {Object.values(MessageType).map((t, i) => (
        <div key={i} className="border rounder p-2 mb-2">
          <Form.Check
            type="radio"
            label={t}
            name="messageTypeRadio"
            onChange={() => handleChange(t)}
          />
        </div>
      ))}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-primary" className="px-2" onClick={prevStep}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Siguiente
        </Button>
      </div>
    </>
  );
}
