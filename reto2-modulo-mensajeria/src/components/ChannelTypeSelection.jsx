import { Button, Form } from "react-bootstrap";
import { Channel } from "../constants";
import { useState } from "react";

export default function ChannelTypeSelection({
  messageData,
  setMessageData,
  nextStep,
  prevStep,
}) {

  const channels = [
    {
      label: "Correo electrónico",
      value: Channel.email
    },
    {
      label: "Mensaje de texto",
      value: Channel.text
    },
    {
      label: "Whatsapp",
      value: Channel.whastapp
    }
  ];

  const [selectedChannels, setSelectedChannels] = useState([]);

  const handleChange = ({ value }) => {
    setSelectedChannels((prev) =>
      prev.includes(value)
        ? prev.filter((ch) => ch !== value)
        : [...prev, value]
    );
  };

  const handleClick = () => {
    setMessageData({ ...messageData, channels: selectedChannels });
    nextStep();
  };

  return (
    <>
      {channels.map((ch, i) => (
        <div key={i} className="border rounder p-2 mb-2">
          <Form.Check label={ch.label} onChange={() => handleChange(ch)} />
        </div>
      ))}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-primary" className="px-4" onClick={prevStep}>
          Atrás
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Siguiente
        </Button>
      </div>
    </>
  );
}
