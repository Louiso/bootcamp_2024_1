import { TextField } from '@mui/material';
import { useMessage } from '../../context/MessageContext';
import { CHANNEL_TYPES } from '../../constants/messages';

const SmsForm = () => {
  const { messages, handleUpdateMessage } = useMessage();
  const smsData = messages[CHANNEL_TYPES.SMS] || { body: '' };

  const _handleChange = (event) => {
    handleUpdateMessage(CHANNEL_TYPES.SMS, { body: event.target.value });
  };

  return (
    <TextField
      fullWidth
      label="Mensaje"
      name="body"
      value={smsData.body}
      onChange={_handleChange}
      multiline
      rows={4}
    />
  );
};

export default SmsForm;