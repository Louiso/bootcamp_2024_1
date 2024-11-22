import { createContext, useState } from "react";
import { messageTemplates } from "../utils/messageTemplates";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [data, setData] = useState({
    sendTo: [],
    type: "",
    channel: [],
    messageTemplate: [{}],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updateSendTo = (users) => {
    setData((prevData) => ({
      ...prevData,
      sendTo: users,
    }));
  };

  const updateType = (type) => {
    setData((prevData) => ({
      ...prevData,
      type,
    }));
  };

  const addChannel = (channels) => {
    setData((prevData) => {
      const { sendTo, type } = prevData;
      
      const updatedMessageTemplates = channels.flatMap((channel) =>
        sendTo.map((user) => {
          const baseTemplate =
            messageTemplates[channel.value]?.find(
              (template) => template.type === type
            ) || {};
            
          const personalizedTemplate = {
            ...baseTemplate,
            user: user.name, 
            subject: baseTemplate?.subject || "",
            message: (baseTemplate.message || "")
              .replace("[userName]", user.name)
              .replace("[Link]", "www.proceso.com"),
          };

          return personalizedTemplate;
        })
      );

      return {
        ...prevData,
        channel: channels,
        messageTemplate: updatedMessageTemplates,
      };
    });
  };

  return (
    <MessageContext.Provider
      value={{
        data,
        currentStep,
        setData,
        nextStep,
        prevStep,
        updateSendTo,
        updateType,
        addChannel,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;