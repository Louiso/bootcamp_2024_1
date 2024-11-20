import { TextField } from '@mui/material';
import { useMessage } from '../../context/MessageContext';
import { CHANNEL_TYPES } from '../../constants/messages';

const EmailForm = () => {
  const { messages, handleUpdateMessage } = useMessage();
  const emailData = messages[CHANNEL_TYPES.EMAIL] || { subject: '', body: '' };

  const _handleChange = (event) => {
    const { name, value } = event.target;
    handleUpdateMessage(CHANNEL_TYPES.EMAIL, { [name]: value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        fullWidth
        label="Asunto"
        name="subject"
        value={emailData.subject}
        onChange={_handleChange}
      />
      <TextField
        fullWidth
        label="Mensaje"
        name="body"
        value={emailData.body}
        onChange={_handleChange}
        multiline
        rows={4}
      />
    </div>
  );
};

export default EmailForm;