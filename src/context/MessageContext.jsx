import { createContext, useContext, useState, useMemo } from 'react';
import { MESSAGE_TEMPLATES, ORDERED_CHANNELS } from '../constants/messages';

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [messageType, setMessageType] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState({});

  const orderedSelectedChannels = useMemo(() => {
    if (!selectedChannels.length) return [];
    return ORDERED_CHANNELS.filter(channelId => selectedChannels.includes(channelId));
  }, [selectedChannels]);

  const handleSelectMessageType = (type) => {
    setMessageType(type);
    // Asegurarse de usar los IDs correctos al establecer los mensajes
    const templates = MESSAGE_TEMPLATES[type] || {};
    setMessages(templates);
  };

  const handleSelectChannels = (channels) => {
    setSelectedChannels(channels);
  };

  const handleUpdateMessage = (channelId, data) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: { ...prev[channelId], ...data }
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