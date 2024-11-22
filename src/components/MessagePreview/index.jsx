import { useState, useEffect, useContext } from "react";
import MessageContext from "../../context/MessageContext";
import { generateRequestPayload } from "../../utils/generatePayload";
import {
  Button,
  Container,
  InputLabel,
  TextField,
  TextareaAutosize,
} from "@mui/material";

const MessagePreview = () => {
  const { data } = useContext(MessageContext);
  const [dataToSend, setDataToSend] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  useEffect(() => {
    const initialData = data.messageTemplate.map((template) => ({
      ...template,
    }));
    setDataToSend(initialData);
  }, [data]);

  const handleInputChange = (index, field, value) => {
    setDataToSend((prev) => {
      const updatedData = [...prev];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const _handleSubmit = () => {
    const payload = JSON.stringify(
      generateRequestPayload({
        ...data,
        messageTemplate: dataToSend,
      }),
      0,
      2
    );
    console.log("Payload to send:", payload);
  };

  const handleNext = () => {
    if (currentPreviewIndex < dataToSend.length - 1) {
      setCurrentPreviewIndex(currentPreviewIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPreviewIndex > 0) {
      setCurrentPreviewIndex(currentPreviewIndex - 1);
    }
  };

  return (
    <div>
      {dataToSend.length > 0 && dataToSend[0].type && (
        <Container
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <Container
            key={currentPreviewIndex}
            sx={{ maxWidth: 450, padding: 2 }}
          >
            {dataToSend[currentPreviewIndex].type === "custom" ? (
              <>
                {dataToSend[currentPreviewIndex].channel === "email" && (
                  <TextField
                    label="Asunto"
                    value={dataToSend[currentPreviewIndex].subject || ""}
                    onChange={(e) =>
                      handleInputChange(
                        currentPreviewIndex,
                        "subject",
                        e.target.value
                      )
                    }
                    fullWidth
                    margin="normal"
                  />
                )}
                <TextareaAutosize
                  value={dataToSend[currentPreviewIndex].message || ""}
                  onChange={(e) =>
                    handleInputChange(
                      currentPreviewIndex,
                      "message",
                      e.target.value
                    )
                  }
                  minRows={4}
                  placeholder="Escribe el mensaje aquí"
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                />
              </>
            ) : (
              <>
                {dataToSend[currentPreviewIndex].channel === "email" && (
                  <>
                    <InputLabel>Asunto:</InputLabel>
                    <TextField
                      value={dataToSend[currentPreviewIndex].subject}
                      fullWidth
                      disabled
                    />
                  </>
                )}
                <InputLabel>Mensaje:</InputLabel>
                <TextField
                  value={dataToSend[currentPreviewIndex].message}
                  multiline
                  fullWidth
                  disabled
                />
              </>
            )}
          </Container>

          <Container
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {currentPreviewIndex > 0 && (
              <Button variant="outlined" onClick={handlePrevious}>
                Anterior
              </Button>
            )}

            {currentPreviewIndex < dataToSend.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={_handleSubmit}
              >
                Enviar
              </Button>
            )}
          </Container>
        </Container>
      )}
    </div>
  );
};

export default MessagePreview;
