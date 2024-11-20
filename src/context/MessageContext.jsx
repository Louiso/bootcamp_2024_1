import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { MESSAGE_TEMPLATES, ORDERED_CHANNELS } from '../constants/messages';

const MessageContext = createContext(null);

export const MODAL_STEPS = {
  MESSAGE_TYPE: 'MESSAGE_TYPE',
  CHANNEL_SELECTION: 'CHANNEL_SELECTION',
  MESSAGE_FORMS: 'MESSAGE_FORMS',
  CLOSED: 'CLOSED'
};

const STEP_FLOW = {
  [MODAL_STEPS.MESSAGE_TYPE]: MODAL_STEPS.CHANNEL_SELECTION,
  [MODAL_STEPS.CHANNEL_SELECTION]: MODAL_STEPS.MESSAGE_FORMS,
  [MODAL_STEPS.MESSAGE_FORMS]: MODAL_STEPS.MESSAGE_FORMS,
};

const STEP_BACK_FLOW = {
  [MODAL_STEPS.CHANNEL_SELECTION]: MODAL_STEPS.MESSAGE_TYPE,
  [MODAL_STEPS.MESSAGE_FORMS]: MODAL_STEPS.CHANNEL_SELECTION,
};

const DEFAULT_STATE = {
  messageType: null,
  selectedChannels: [],
  messages: {},
  currentStep: MODAL_STEPS.CLOSED,
};

export const MessageProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const { messageType, selectedChannels, messages, currentStep } = state;

  const orderedSelectedChannels = useMemo(() => 
    ORDERED_CHANNELS.filter(channel => selectedChannels.includes(channel))
  , [selectedChannels]);

  const _resetState = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const handleSelectMessageType = useCallback((type) => {
    setState(prev => {
      const initialMessages = {};
      prev.selectedChannels.forEach(channel => {
        initialMessages[channel] = MESSAGE_TEMPLATES[type][channel];
      });
      return {
        ...prev,
        messageType: type,
        messages: initialMessages,
      };
    });
  }, []);

  const handleSelectChannels = useCallback((channels) => {
    setState(prev => {
      if (!prev.messageType) {
        return { ...prev, selectedChannels: channels };
      }

      const initialMessages = {};
      channels.forEach(channel => {
        initialMessages[channel] = MESSAGE_TEMPLATES[prev.messageType][channel];
      });

      return {
        ...prev,
        selectedChannels: channels,
        messages: initialMessages,
      };
    });
  }, []);

  const handleUpdateMessage = useCallback((channel, data) => {
    setState(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [channel]: { ...prev.messages[channel], ...data }
      }
    }));
  }, []);

  const handleOpenModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: MODAL_STEPS.MESSAGE_TYPE
    }));
  }, []);

  const handleCloseModals = useCallback(() => {
    _resetState();
  }, [_resetState]);

  const handleNextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: STEP_FLOW[prev.currentStep] || prev.currentStep
    }));
  }, []);

  const handlePrevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: STEP_BACK_FLOW[prev.currentStep] || prev.currentStep
    }));
  }, []);

  const contextValue = useMemo(() => ({
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
  }), [
    messageType,
    orderedSelectedChannels,
    currentStep,
    messages,
    handleSelectMessageType,
    handleSelectChannels,
    handleUpdateMessage,
    handleNextStep,
    handlePrevStep,
    handleOpenModal,
    handleCloseModals
  ]);

  return (
    <MessageContext.Provider value={contextValue}>
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