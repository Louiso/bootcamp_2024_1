import { Card } from "react-bootstrap";
import UserSelection from "./components/UserSelection";
import { useEffect, useState } from "react";
import { appConfigs } from "./constants";
import MessageTypeSelection from "./components/MessageTypeSelection";
import ChannelTypeSelection from "./components/ChannelTypeSelection";
import MessageForm from "./components/MessageForm";
import Info from "./components/Info";

function App() {
  const [step, setStep] = useState(1);
  const [cardTitle, setCardTitle] = useState("");
  const [messageData, setMessageData] = useState({
    users: [],
    type: "",
    channels: [],
    messages: [],
  });

  useEffect(() => {
    const { title } = appConfigs.find((config) => config.step === step) ?? "";
    setCardTitle(title);

  }, [step]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-25">
        <Card.Body>
          <Card.Title className="mb-4">{cardTitle}</Card.Title>
          {step === 1 && (
            <UserSelection
              messageData={messageData}
              setMessageData={setMessageData}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <MessageTypeSelection
              messageData={messageData}
              setMessageData={setMessageData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <ChannelTypeSelection
              messageData={messageData}
              setMessageData={setMessageData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <MessageForm
              messageData={messageData}
              setMessageData={setMessageData}
              nextStep={nextStep}
              prevStep={prevStep}
              setCardTitle={setCardTitle}
            />
          )}
          {step === 5 && (
            <Info messageData={messageData} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
