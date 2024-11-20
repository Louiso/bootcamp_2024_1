// MessageContext.jsx
import { createContext, useContext, useState, useMemo } from 'react';
import { MESSAGE_TEMPLATES, ORDERED_CHANNELS } from '../constants/messages';

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [messageType, setMessageType] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState({});

  const orderedSelectedChannels = useMemo(() => {
    return ORDERED_CHANNELS.filter(channel => selectedChannels.includes(channel));
  }, [selectedChannels]);

  const handleSelectMessageType = (type) => {
    setMessageType(type);
    // Solo inicializamos los mensajes para los canales seleccionados
    const initialMessages = {};
    selectedChannels.forEach(channel => {
      initialMessages[channel] = MESSAGE_TEMPLATES[type][channel];
    });
    setMessages(initialMessages);
  };

  const handleSelectChannels = (channels) => {
    setSelectedChannels(channels);
    // Actualizamos los mensajes cuando se seleccionan los canales
    if (messageType) {
      const initialMessages = {};
      channels.forEach(channel => {
        initialMessages[channel] = MESSAGE_TEMPLATES[messageType][channel];
      });
      setMessages(initialMessages);
    }
  };

  const handleUpdateMessage = (channel, data) => {
    setMessages(prev => ({
      ...prev,
      [channel]: { ...prev[channel], ...data }
    }));
  };

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const value = {
    messageType,
    selectedChannels: orderedSelectedChannels,
    currentStep,
    messages,
    handleSelectMessageType,
    handleSelectChannels,
    handleUpdateMessage,
    handleNextStep,
    handlePrevStep
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};