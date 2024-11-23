import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { channelsConfig } from "../../utils/constants";

const MessageForm = ({ onBack, onNext, template, onUpdate, buttonLabel  }) => {
  const [formData, setFormData] = useState({
    asunto: template.asunto,
    mensaje: template.mensaje,
  });

  const channel = channelsConfig.find(item => item.channel == template.channel)

  /* useEffect(() => {
    setFormData({
      asunto: template?.asunto,
      mensaje: template.mensaje,
    });
  }, [template]); */

  const handleChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate?.({ ...template, ...updatedData });
  };

  const handleBack = () => {
    onBack?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {channel.label}
      </Typography>
      {template.asunto !== undefined && (
        <TextField
          label="Asunto"
          variant="outlined"
          fullWidth
          value={formData.asunto}
          onChange={(e) => handleChange("asunto", e.target.value)}
          placeholder="Escribe ..."
        />
      )}
      <TextField
        label="Mensaje"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formData.mensaje}
        onChange={(e) => handleChange("mensaje", e.target.value)}
        placeholder="Escribe ..."
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{ textTransform: "none", marginRight: "0.5rem"}}
        >
          Atrás
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ textTransform: "none" }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default MessageForm;
