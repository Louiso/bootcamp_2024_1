import { memo, useState, useCallback } from 'react';
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
import { MESSAGE_TYPES, MESSAGE_TYPE_LABELS } from '../../constants/messages';
import { useMessage } from '../../context/MessageContext';

const MessageTypeModal = ({ open }) => {
  const { handleSelectMessageType, handleNextStep, handleCloseModals } = useMessage();
  const [selectedType, setSelectedType] = useState('');

  const _handleChange = useCallback((event) => {
    setSelectedType(event.target.value);
  }, []);

  const _handleNext = useCallback(() => {
    handleSelectMessageType(selectedType);
    handleNextStep();
    setSelectedType('');
  }, [handleSelectMessageType, handleNextStep, selectedType]);

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseModals}
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
        <Button onClick={handleCloseModals}>
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
  );
};

export default memo(MessageTypeModal);