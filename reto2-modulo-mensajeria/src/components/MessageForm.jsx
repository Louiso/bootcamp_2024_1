import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { generateInputData } from "../utils";
import { Channel, messageConfigs } from "../constants";

export default function MessageForm({
  messageData,
  setMessageData,
  setCardTitle,
  nextStep,
  prevStep,
}) {
  const { type, data } = generateInputData(messageData);
  const [dataIndex, setDataIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputData, setInputData] = useState({
    user: "",
    channel: "",
    subject: "",
    content: "",
  });
  
  const [sendButtonText, setSendButtonText] = useState("Siguiente");

  useEffect(() => {
    const dataItem = data[dataIndex];

    setInputData(dataItem);

    dataIndex + 1 === data.length
      ? setSendButtonText("Enviar")
      : setSendButtonText("Siguiente");
  }, [dataIndex]);

  useEffect(() => {

    const { channel, user } = data[dataIndex];

    const { title } = messageConfigs.find(
      (config) => config.channel === channel
    );
    setCardTitle(`${title} - ${user}`);
  }, [inputData])

  const handleClick = () => {
    if (dataIndex < data.length - 1) {
      setDataIndex(dataIndex + 1);
      setMessages([...messages, inputData]);
    }
    else {
      setMessageData({ ...messageData, messages });
      nextStep();
    }
  };

  const handleChange = ({ target }) => {
    setInputData({...inputData, [target.name]: target.value});
  }

  return (
    <>
      {inputData.channel === Channel.email && (
        <Form.Group className="mb-2">
          <Form.Label>Asunto</Form.Label>
          <Form.Control
            placeholder="Escribe..."
            name="subject"
            onChange={handleChange}
            value={inputData.subject}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-4">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Escribe..."
          name="content"
          onChange={handleChange}
          value={inputData.content}
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-primary" className="px-4" onClick={prevStep}>
          Atrás
        </Button>
        <Button variant="primary" onClick={handleClick}>
          {sendButtonText}
        </Button>
      </div>
    </>
  );
}
