import { useContext, useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { channels } from "../../utils/defaultContent";
import MessageContext from "../../context/MessageContext";
import "./index.css";

const SelectChannels = ({ onSelectChannel }) => {
  const { data } = useContext(MessageContext);
  const [selectedChannels, setSelectedChannels] = useState(data.channel);

  const _handleCheckboxChange = ({ target: { checked } }, channel) => {
    setSelectedChannels((prevSelected) => {
      if (!checked) {
        return prevSelected.filter(
          (selectedChannel) => selectedChannel.id !== channel.id
        );
      }
      const updated = [...prevSelected, channel];
      return channels.filter((ch) => updated.some((sel) => sel.id === ch.id));
    });
  };

  const _handleSelectChannel = () => {
    onSelectChannel(selectedChannels);
  };

  useEffect(() => {
    _handleSelectChannel();
  }, [selectedChannels]);

  const isSelected = (channel) =>
    selectedChannels.some((selected) => selected.id === channel.id);

  return (
    <div>
      <div className="step-text">Seleccion de canales</div>
      {channels?.map((channel) => (
        <Paper
          key={channel.id}
          className={`channel-container ${
            isSelected(channel) ? "selected" : ""
          }`}
          elevation={3}
        >
          <FormControlLabel
            className={`text-label ${isSelected(channel) ? "text-selected" : ""}`}
            control={
              <Checkbox
                onChange={(e) => _handleCheckboxChange(e, channel)}
                checked={isSelected(channel)}
              />
            }
            label={channel.label}
          />
        </Paper>
      ))}
    </div>
  );
};

export default SelectChannels;
