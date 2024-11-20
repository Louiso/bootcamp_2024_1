import React from "react";
import { ChannelType } from "../components/MessageCard/constans";

interface ChannelTypeSelectorProps {
  channels: { type: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChannelTypeSelector: React.FC<ChannelTypeSelectorProps> = ({ channels, onChange }) => {
  return (
    <div>
      {Object.values(ChannelType).map((channelType) => {
        const checked = channels.some((channel) => channel.type === channelType);
        return (
          <label key={channelType}>
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              name={channelType}
            />
            {channelType}
          </label>
        );
      })}
    </div>
  );
};

export default ChannelTypeSelector;