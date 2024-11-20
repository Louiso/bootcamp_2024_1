import { createContext, useContext, useState, useMemo } from 'react';
import { MESSAGE_TEMPLATES, ORDERED_CHANNELS } from '../constants/messages';

const MessageContext = createContext(null);

export const MODAL_STEPS = {
  MESSAGE_TYPE: 'MESSAGE_TYPE',
  CHANNEL_SELECTION: 'CHANNEL_SELECTION',
  MESSAGE_FORMS: 'MESSAGE_FORMS',
  CLOSED: 'CLOSED'
};

export const MessageProvider = ({ children }) => {
  const [messageType, setMessageType] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [currentStep, setCurrentStep] = useState(MODAL_STEPS.CLOSED);
  const [messages, setMessages] = useState({});

  const orderedSelectedChannels = useMemo(() => {
    return ORDERED_CHANNELS.filter(channel => selectedChannels.includes(channel));
  }, [selectedChannels]);

  const handleSelectMessageType = (type) => {
    setMessageType(type);
    
    const initialMessages = {};
    selectedChannels.forEach(channel => {
      initialMessages[channel] = MESSAGE_TEMPLATES[type][channel];
    });
    setMessages(initialMessages);
  };

  const handleSelectChannels = (channels) => {
    setSelectedChannels(channels);
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

  const handleOpenModal = () => {
    setCurrentStep(MODAL_STEPS.MESSAGE_TYPE);
  };

  const handleCloseModals = () => {
    setCurrentStep(MODAL_STEPS.CLOSED);
    setMessageType(null);
    setSelectedChannels([]);
    setMessages({});
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case MODAL_STEPS.MESSAGE_TYPE:
        setCurrentStep(MODAL_STEPS.CHANNEL_SELECTION);
        break;
      case MODAL_STEPS.CHANNEL_SELECTION:
        setCurrentStep(MODAL_STEPS.MESSAGE_FORMS);
        break;
      default:
        break;
    }
  };

  const handlePrevStep = () => {
    switch (currentStep) {
      case MODAL_STEPS.CHANNEL_SELECTION:
        setCurrentStep(MODAL_STEPS.MESSAGE_TYPE);
        break;
      case MODAL_STEPS.MESSAGE_FORMS:
        setCurrentStep(MODAL_STEPS.CHANNEL_SELECTION);
        break;
      default:
        break;
    }
  };

  const value = {
    messageType,
    selectedChannels: orderedSelectedChannels,
    currentStep,
    messages,
    handleSelectMessageType,
    handleSelectChannels,
    handleUpdateMessage,
    handleNextStep,
    handlePrevStep,
    handleOpenModal,
    handleCloseModals
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