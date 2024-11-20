import { memo } from 'react';
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
    <div className="flex flex-col gap-8">
      <TextField
        sx={{ marginTop: '0.5rem' }}
        fullWidth
        label="Asunto"
        name="subject"
        value={emailData.subject}
        onChange={_handleChange}
      />
      <TextField
        sx={{ marginTop: '2rem' }}
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

export default memo(EmailForm);