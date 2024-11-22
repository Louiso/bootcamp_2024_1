import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useContext, useState } from "react";
import { messageType } from "../../utils/defaultContent";
import MessageContext from "../../context/MessageContext";
import "./index.css";

const SelectMessageType = ({ onSelecType }) => {
  const { data } = useContext(MessageContext);
  const [selectedValue, setSelectedValue] = useState(data.type);

  const _handleChangeTypeValue = ({ target: { value } }) => {
    onSelecType(value);
    setSelectedValue(value);
  };

  return (
    <>
      <div className="step-text">Seleccion de tipo de mensaje</div>
      <RadioGroup
        name="type-options"
        value={selectedValue}
        onChange={_handleChangeTypeValue}
      >
        {messageType?.map((type) => (
          <Paper
            key={type.value}
            className={`radio-container ${
              selectedValue === type.value ? "selected" : ""
            }`}
            elevation={3}
          >
            <FormControlLabel
              key={type.value}
              value={type.value}
              control={<Radio />}
              label={type.label}
            />
          </Paper>
        ))}
      </RadioGroup>
    </>
  );
};

export default SelectMessageType;
