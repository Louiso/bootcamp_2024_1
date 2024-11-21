import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  DialogActions,
} from '@mui/material';

const ModalSelectType = ({ isOpen, onClose, onSelectType }) => {
  const [selectedType, setSelectedType] = useState('');

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Seleccion de tipo de mensaje</DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <FormControlLabel value="Invitación" control={<Radio />} label="Invitación" />
            <FormControlLabel
              value="Recordatorio de Proceso"
              control={<Radio />}
              label="Recordatorio de Proceso"
            />
            <FormControlLabel value="Personalizado" control={<Radio />} label="Personalizado" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={() => onSelectType(selectedType)}
          color="primary"
          disabled={!selectedType}
        >
          Siguiente
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSelectType;
