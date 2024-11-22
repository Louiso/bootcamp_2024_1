import { useState, createContext, useContext, useEffect, memo } from "react";
import MessageContext from "./context/MessageContext";
import UserList from "./components/UserList";
import { Button, Container } from "@mui/material";
import SelectMessageType from "./components/SelectMessageType";
import SelectChannels from "./components/SelectChannels";
import MessagePreview from "./components/MessagePreview";

const App = () => {
  const {
    currentStep,
    nextStep,
    prevStep,
    updateSendTo,
    updateType,
    addChannel,
  } = useContext(MessageContext);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isMessageTypeSelected, setIsMessageTypeSelected] = useState(false);
  const [isChannelSelected, setIsChannelSelected] = useState(false);

  const _handleNextStep = () => {
    const validationMap = {
      1: isUserSelected,
      2: isMessageTypeSelected,
      3: isChannelSelected,
    };

    if (validationMap[currentStep]) {
      nextStep();
    }
  };

  const _handlePrevStep = () => {
    prevStep();
  };

  const MainSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserList
            onSelectUsers={(users) => {
              updateSendTo(users);
              setIsUserSelected(users.length > 0);
            }}
          />
        );
      case 2:
        return (
          <SelectMessageType
            onSelecType={(type) => {
              updateType(type);
              setIsMessageTypeSelected(type.length > 0);
            }}
          />
        );
      case 3:
        return (
          <SelectChannels
            onSelectChannel={(channel) => {
              addChannel(channel);
              setIsChannelSelected(channel.length > 0);
            }}
          />
        );
      case 4:
        return <MessagePreview />;
      default:
        return <UserList />;
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        width: "500px",
      }}
    >
      <Container
      >
        {MainSteps()}
        <Container
          style={{
            marginTop: "20px",
            display: "flex",
            padding: "0",
            justifyContent: "end"
          }}
        >
          {currentStep > 1 && (
            <Button variant="outlined" onClick={_handlePrevStep}>
              Anterior
            </Button>
          )}
          {currentStep < 4 && (
            <Button
              variant="contained"
              onClick={_handleNextStep}
              disabled={
                (currentStep === 1 && !isUserSelected) ||
                (currentStep === 2 && !isMessageTypeSelected) ||
                (currentStep === 3 && !isChannelSelected)
              }
            >
              Siguiente
            </Button>
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default App;
