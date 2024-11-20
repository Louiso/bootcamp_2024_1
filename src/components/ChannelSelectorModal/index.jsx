import { memo, useState, useCallback } from 'react';
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
import { CHANNEL_TYPES, CHANNEL_LABELS } from '../../constants/messages';
import { useMessage } from '../../context/MessageContext';

const ChannelSelectorModal = ({ open }) => {
  const { handleSelectChannels, handleNextStep, handlePrevStep } = useMessage();
  const [selectedChannels, setSelectedChannels] = useState([]);

  const _handleChange = useCallback((event) => {
    const channel = event.target.name;
    setSelectedChannels(prev => {
      if (event.target.checked) {
        return [...prev, channel];
      }
      return prev.filter(ch => ch !== channel);
    });
  }, []);

  const _handleNext = useCallback(() => {
    handleSelectChannels(selectedChannels);
    handleNextStep();
    setSelectedChannels([]);
  }, [handleSelectChannels, handleNextStep, selectedChannels]);

  return (
    <Dialog
      open={open}
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
        <Button onClick={handlePrevStep}>
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
  );
};

export default memo(ChannelSelectorModal);