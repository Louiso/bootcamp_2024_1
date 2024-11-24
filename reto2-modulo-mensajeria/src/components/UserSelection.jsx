import { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

export default function UserSelection({
  messageData,
  setMessageData,
  nextStep,
}) {
  const users = ["John", "Joe", "Maria", "Jolyne", "Ekko"];

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleClick = () => {
    setMessageData({ ...messageData, users: selectedUsers });
    nextStep();
  };

  return (
    <>
      <Button className="mb-4" variant="secondary" onClick={handleClick}>
        ENVIAR MENSAJE
      </Button>
      <ListGroup as="ul">
        {users.map((u, i) => (
          <ListGroup.Item key={`${u}${i}`} as="li">
            <Form.Check label={u} onChange={() => handleChange(u)} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
