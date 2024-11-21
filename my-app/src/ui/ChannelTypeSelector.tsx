import React from "react";
import { ChannelType } from "../components/MessageCard/constans";

interface ChannelTypeSelectorProps {
  channels: { type: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChannelTypeSelector: React.FC<ChannelTypeSelectorProps> = ({ channels, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {Object.values(ChannelType).map((channelType) => {
        const checked = channels.some((channel) => channel.type === channelType);
        return (
          <label
            className={`flex items-center space-x-2 border rounded-md letra text-sm text-[#BFBFBF] p-[14px] ${
              checked ? "border-[#6EB1EF] text-[#6EB1EF]" : "border-gray-300"
            }`}
            key={channelType}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              name={channelType}

            />
            <span>{channelType}</span>
          </label>
        );
      })}
    </div>
  );
};

export default ChannelTypeSelector;