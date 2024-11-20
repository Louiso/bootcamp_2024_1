import { Button } from '@mui/material';
import { useState } from 'react';
import MessageTypeModal from '../MessageTypeModal';

const SendMessage = () => {
  const [open, setOpen] = useState(false);

  const _handleClick = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={_handleClick}
      >
        Enviar mensaje
      </Button>
      
      <MessageTypeModal 
        open={open} 
        onClose={_handleClose} 
      />
    </>
  );
};

export default SendMessage;