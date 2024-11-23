import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
  import {typeMessageConfig} from "../../utils/constants";
 
  const TypeMessageSelector = ({onClickBack,selectedMessage,setSelectedMessage, onClickSendTypeMessage}) => {
  
    const handleRadioChange = ({ target: { value } }) => {
      setSelectedMessage(value);
    };

    const handleOnClickBack = () =>{
        onClickBack?.();
    }

    const handleOnClickSendTypeMessage = () => {
      onClickSendTypeMessage?.();
    }

  
    return (
        <div>
      <FormControl>
        <h1>Seleccion tipo de mensaje</h1>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={handleRadioChange}
          value={selectedMessage}
        >
          {typeMessageConfig.map((typeMessage) => {
            return (
              <FormControlLabel
                key={typeMessage.typeMessage}
                value={typeMessage.typeMessage}
                control={<Radio />}
                label={typeMessage.label}
              />
            );
          })}
        </RadioGroup>
        <div>
          <Button
            variant="outlined"
            style={{ marginRight: "1rem" }}
            onClick={handleOnClickBack}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={!selectedMessage}
            onClick={handleOnClickSendTypeMessage}
          >
            Siguiente
          </Button>
        </div>
      </FormControl>
      </div>
    );
  };
  
  export default TypeMessageSelector;
  