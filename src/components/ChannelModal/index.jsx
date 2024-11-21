import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const ChannelModal = ({ 
  isOpen, 
  onClose, 
  channel, 
  onNext, 
  isLastChannel, 
  selectedUsers, 
  messageType 
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (messageType === 'Invitación' || messageType === 'Recordatorio de Proceso') {
      const defaultMessage = `Hola [username] hemos visto tu perfil y nos parece interesante. Encuentra mas información aqui:[Link]`;
      const defaultAsunto = messageType;
      
      setFormData((prev) => ({
        ...prev,
        ...(channel === 'Correo electrónico' ? { asunto: defaultAsunto, mensaje: defaultMessage } : { mensaje: defaultMessage }),
      }));
    } else {
      setFormData({});
    }
  }, [messageType, channel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    selectedUsers.forEach((user) => {
      console.log('Formulario enviado:', {
        channel,
        formData: {
          ...formData,
          mensaje: formData.mensaje.replace('[username]', user.name),
        },
        user,
      });
    });

    if (isLastChannel) {
      onClose(); 
    } else {
      onNext(); 
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{`${channel}`}</DialogTitle>
      <DialogContent>
        {channel === 'Correo electrónico' && (
          <>
            <TextField
              label="Asunto"
              name="asunto"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formData.asunto || ''}
            />
            <TextField
              label="Mensaje"
              name="mensaje"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              onChange={handleChange}
              value={formData.mensaje || ''}
            />
          </>
        )}

        {(channel === 'Mensaje de Texto' || channel === 'WhatsApp') && (
          <TextField
            label="Mensaje"
            name="mensaje"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            onChange={handleChange}
            value={formData.mensaje || ''}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {isLastChannel ? 'Enviar' : 'Siguiente'}
        </Button>
       
      </DialogActions>
    </Dialog>
  );
};

export default ChannelModal;
