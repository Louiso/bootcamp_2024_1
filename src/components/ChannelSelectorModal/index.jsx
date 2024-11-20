// ChannelSelectorModal/index.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useState } from 'react';
import { CHANNEL_TYPES, CHANNEL_LABELS } from '../../constants/messages';
import { useMessage } from '../../context/MessageContext';
import MessageFormsModal from '../MessageFormsModal';

const ChannelSelectorModal = ({ open, onClose }) => {
  const [openMessageForms, setOpenMessageForms] = useState(false);
  const { handleSelectChannels } = useMessage();
  const [selectedChannels, setSelectedChannels] = useState([]);

  const _handleChange = (event) => {
    const channel = event.target.name;
    setSelectedChannels(prev => {
      if (event.target.checked) {
        return [...prev, channel];
      }
      return prev.filter(ch => ch !== channel);
    });
  };

  const _handleNext = () => {
    handleSelectChannels(selectedChannels);
    setOpenMessageForms(true);
    onClose();
  };

  const _handleCloseMessageForms = () => {
    setOpenMessageForms(false);
    setSelectedChannels([]);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Selección de canales
        </DialogTitle>

        <DialogContent>
          <FormGroup>
            {Object.values(CHANNEL_TYPES).map((channel) => (
              <FormControlLabel
                key={channel}
                control={
                  <Checkbox
                    checked={selectedChannels.includes(channel)}
                    onChange={_handleChange}
                    name={channel}
                  />
                }
                label={CHANNEL_LABELS[channel]}
              />
            ))}
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Atrás
          </Button>
          <Button
            onClick={_handleNext}
            disabled={selectedChannels.length === 0}
            variant="contained"
          >
            Siguiente
          </Button>
        </DialogActions>
      </Dialog>

      <MessageFormsModal
        open={openMessageForms}
        onClose={_handleCloseMessageForms}
      />
    </>
  );
};

export default ChannelSelectorModal;