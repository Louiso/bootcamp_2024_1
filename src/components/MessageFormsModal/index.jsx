import { memo, useCallback, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useMessage } from '../../context/MessageContext';
import EmailForm from './EmailForm';
import SmsForm from './SmsForm';
import WhatAppForm from './WhatsAppForm';
import { CHANNEL_TYPES, CHANNEL_LABELS } from '../../constants/messages';

const FORM_COMPONENTS = {
  [CHANNEL_TYPES.EMAIL]: EmailForm,
  [CHANNEL_TYPES.SMS]: SmsForm,
  [CHANNEL_TYPES.WHATSAPP]: WhatAppForm
};

const MessageFormsModal = ({ open }) => {
  const { 
    selectedChannels, 
    messages, 
    messageType, 
    handleCloseModals,
    handlePrevStep
  } = useMessage();
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
    }
    
    return () => {
      setCurrentStep(0);
    };
  }, [open]);

  const _handleSubmit = useCallback(() => {
    const selectedMessages = Object.fromEntries(
      selectedChannels
        .filter(channel => messages[channel])
        .map(channel => [channel, messages[channel]])
    );
    
    const payload = {
      messageType,
      channels: selectedMessages,
    };
    
    console.log('Payload para el backend:', payload);
    handleCloseModals();
  }, [messages, messageType, handleCloseModals, selectedChannels]);

  const _handleNext = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const _handleBack = useCallback(() => {
    if (currentStep === 0) {
      handlePrevStep();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep, handlePrevStep]);

  const isLastStep = currentStep === selectedChannels.length - 1;
  const currentChannel = selectedChannels[currentStep];
  const Component = FORM_COMPONENTS[currentChannel];
  
  if (!Component) return null;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {CHANNEL_LABELS[currentChannel]}
      </DialogTitle>
      
      <DialogContent>
        <Component />
      </DialogContent>

      <DialogActions>
        <Button onClick={_handleBack}>
          Atrás
        </Button>
        <Button
          onClick={isLastStep ? _handleSubmit : _handleNext}
          variant="contained"
        >
          {isLastStep ? 'Enviar' : 'Siguiente'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(MessageFormsModal);