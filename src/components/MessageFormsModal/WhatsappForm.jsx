// WhatsappForm.jsx
import { TextField } from '@mui/material';
import { useMessage } from '../../context/MessageContext';
import { CHANNEL_TYPES } from '../../constants/messages';

const WhatsappForm = () => {
  const { messages, handleUpdateMessage } = useMessage();
  const whatsappData = messages[CHANNEL_TYPES.WHATSAPP] || { body: '' };

  const _handleChange = (event) => {
    handleUpdateMessage(CHANNEL_TYPES.WHATSAPP, { body: event.target.value });
  };

  return (
    <TextField
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

export default WhatsappForm;