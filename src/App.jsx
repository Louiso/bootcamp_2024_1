import { useState } from "react";
import CheckboxList from "./components/CheckboxList";
import ModalSelectType from "./components/ModalSelectType";
import ModalChannels from "./components/ModalChannels";
import ChannelModal from "./components/ChannelModal";
import { Button, Container, Typography } from "@mui/material";

const App = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [selectedModalChannel, setSelectedModalChannel] = useState(false);


  const handleSendMessage = () => {
    if (selectedUsers.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("Seleccione un usuario.");
    }
  };

  const handleNextChannel = () => {
    setCurrentChannelIndex((prev) => prev + 1);
  };

  const isLastChannel = currentChannelIndex === selectedChannels.length - 1;

  return (
    <Container>
   

      <CheckboxList
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        disabled={selectedUsers.length === 0}
      >
        Enviar mensaje
      </Button>

      <ModalSelectType
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectType={(type) => {
          setMessageType(type);
          setIsModalOpen(false);
          setIsChannelModalOpen(true);
        }}
      />

      <ModalChannels
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
        onNext={(channels) => {
          setSelectedChannels(channels);
          setIsChannelModalOpen(false);
          setCurrentChannelIndex(0);
          // setSelectedModalChannel(true);
        }}
        onBack={() => {
          setIsChannelModalOpen(false);
          setIsModalOpen(true);
        }}
      />

      {selectedChannels.length > 0 && (
        <ChannelModal
        isOpen={currentChannelIndex < selectedChannels.length}
        // onClose={() => setCurrentChannelIndex(0)}
        onClose={() => {
          setSelectedChannels([]); 
          setSelectedModalChannel(false)
        }
        }

        channel={selectedChannels[currentChannelIndex]}
        onNext={handleNextChannel}
        isLastChannel={isLastChannel}
        selectedUsers={selectedUsers}
        messageType={messageType}
      />
      )}
    </Container>
  );
};

export default App;
