import { useCallback, useState } from 'react';
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
import WhatsappForm from './WhatsappForm';
import { CHANNEL_TYPES, CHANNEL_LABELS } from '../../constants/messages';

const FORM_COMPONENTS = {
  [CHANNEL_TYPES.EMAIL]: EmailForm,
  [CHANNEL_TYPES.SMS]: SmsForm,
  [CHANNEL_TYPES.WHATSAPP]: WhatsappForm
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

  const _handleSubmit = useCallback(() => {
    const selectedMessages = {};
    
    selectedChannels.forEach(channel => {
      if (messages[channel]) {
        selectedMessages[channel] = messages[channel];
      }
    });

    const payload = {
      messageType,
      channels: selectedMessages,
      variables: {
        userName: '[userName]',
        link: '[Link]'
      }
    };
    
    console.log('Payload para el backend:', payload);
    handleCloseModals();
    setCurrentStep(0);
  }, [messages, messageType, handleCloseModals, selectedChannels]);

  const _handleNext = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

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
        {currentStep === 0 ? (
          <Button onClick={handlePrevStep}>
            Atrás
          </Button>
        ) : (
          <Button onClick={() => setCurrentStep(prev => prev - 1)}>
            Atrás
          </Button>
        )}
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

export default MessageFormsModal;