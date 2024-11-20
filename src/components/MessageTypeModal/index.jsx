// MessageTypeModal/index.jsx
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useState } from 'react';
import { MESSAGE_TYPES, MESSAGE_TYPE_LABELS } from '../../constants/messages';
import { useMessage } from '../../context/MessageContext';
import ChannelSelectorModal from '../ChannelSelectorModal';

const MessageTypeModal = ({ open, onClose }) => {
  const [openChannelSelector, setOpenChannelSelector] = useState(false);
  const { handleSelectMessageType } = useMessage();
  const [selectedType, setSelectedType] = useState('');

  const _handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const _handleNext = () => {
    handleSelectMessageType(selectedType);
    setOpenChannelSelector(true);
    onClose();
  };

  const _handleCloseChannelSelector = () => {
    setOpenChannelSelector(false);
    setSelectedType('');
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
          Selección de tipo de mensaje
        </DialogTitle>
        
        <DialogContent>
          <RadioGroup
            value={selectedType}
            onChange={_handleChange}
          >
            {Object.values(MESSAGE_TYPES).map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={MESSAGE_TYPE_LABELS[type]}
              />
            ))}
          </RadioGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={_handleNext}
            disabled={!selectedType}
            variant="contained"
          >
            Siguiente
          </Button>
        </DialogActions>
      </Dialog>

      <ChannelSelectorModal 
        open={openChannelSelector}
        onClose={_handleCloseChannelSelector}
      />
    </>
  );
};

export default MessageTypeModal;