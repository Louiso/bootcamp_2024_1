import { memo } from 'react';
import { TextField } from '@mui/material';
import { useMessage } from '../../context/MessageContext';
import { CHANNEL_TYPES } from '../../constants/messages';

const WhatAppForm = () => {
  const { messages, handleUpdateMessage } = useMessage();
  const whatsappData = messages[CHANNEL_TYPES.WHATSAPP] || { body: '' };

  const _handleChange = (event) => {
    handleUpdateMessage(CHANNEL_TYPES.WHATSAPP, { body: event.target.value });
  };

  return (
    <TextField
      sx={{ marginTop: '0.5rem' }}
      fullWidth
      label="Mensaje"
      name="body"
      value={whatsappData.body}
      onChange={_handleChange}
      multiline
      rows={4}
    />
  );
};

export default memo(WhatAppForm);