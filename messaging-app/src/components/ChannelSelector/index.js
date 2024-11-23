import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { channelsConfig} from "../../utils/constants";


const ChannelSelector = ({onClickBack, selectedChannels, setSelectedChannels, onClickSendChannels}) => {

  const handleCheckboxChange = (id) => {
    setSelectedChannels((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };
  
  const handleOnClickBack = () => {
    onClickBack?.();
  }

  const handleOnClickSendChannels = () => {
    onClickSendChannels?.();
  }

  return (
    <div>
      <h1>Seleccion de Canales</h1>
      <FormGroup>
        {channelsConfig.map((channel) => (
          <FormControlLabel
            key={channel.channel}
            control={
              <Checkbox
                checked={selectedChannels.has(channel.channel)}
                onChange={() => handleCheckboxChange(channel.channel)}
              />
            }
            label={channel.label}
          />
        ))}
      </FormGroup>
      <div>
        <Button
          variant="outlined"
          style={{ marginRight: "1rem" }}
          onClick={handleOnClickBack}
        >
          Atras
        </Button>
        <Button
          variant="contained"
          disabled={selectedChannels.size === 0}
          onClick={handleOnClickSendChannels}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ChannelSelector;
