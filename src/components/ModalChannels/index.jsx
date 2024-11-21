import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from "@mui/material";

const channels = ["Correo electrónico", "Mensaje de Texto", "WhatsApp"];
const ModalChannels = ({ isOpen, onClose, onNext, onBack }) => {
  const [selectedChannels, setSelectedChannels] = useState([]);

  const handleCheckboxChange = (channel) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleStartSequence = () => {
    const sortedChannels = [...selectedChannels].sort(
      (a, b) => channels.indexOf(a) - channels.indexOf(b)
    );
    setSelectedChannels(sortedChannels);
    onNext(sortedChannels);
  };


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Seleccion de canales</DialogTitle>
      <DialogContent>
        <FormGroup>
          {channels.map((channel) => (
            <FormControlLabel
              key={channel}
              control={
                <Checkbox
                  checked={selectedChannels.includes(channel)}
                  onChange={() => handleCheckboxChange(channel)}
                />
              }
              label={channel}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} color="secondary">
          Atrás
        </Button>
        <Button
          onClick={() => {
            handleStartSequence();
            //  onNext(selectedChannels)
          }}
          color="primary"
          disabled={selectedChannels.length === 0}
        >
          Siguiente
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalChannels;
