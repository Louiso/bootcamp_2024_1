import { memo } from 'react';
import { Button } from '@mui/material';
import MessageTypeModal from '../MessageTypeModal';
import ChannelSelectorModal from '../ChannelSelectorModal';
import MessageFormsModal from '../MessageFormsModal';
import { useMessage, MODAL_STEPS } from '../../context/MessageContext';

const SendMessage = () => {
  const { currentStep, handleOpenModal } = useMessage();

  return (
    <>
      <Button 
        variant="contained" 
        onClick={handleOpenModal}
      >
        Enviar mensaje
      </Button>
      
      <MessageTypeModal 
        open={currentStep === MODAL_STEPS.MESSAGE_TYPE}
      />
      
      <ChannelSelectorModal 
        open={currentStep === MODAL_STEPS.CHANNEL_SELECTION}
      />

      <MessageFormsModal 
        open={currentStep === MODAL_STEPS.MESSAGE_FORMS}
      />
    </>
  );
};

export default memo(SendMessage);