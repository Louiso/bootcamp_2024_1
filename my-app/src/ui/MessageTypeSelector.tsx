import React from "react";
import { MessageType } from "../components/MessageCard/constans";

interface MessageTypeSelectorProps {
  messageType: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({
  messageType,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {Object.values(MessageType).map((type) => (
        <label
          className={`flex items-center space-x-2 border rounded-md letra text-sm text-[#BFBFBF] p-[14px] ${
            messageType === type ? "border-[#6EB1EF] text-[#6EB1EF]" : "border-gray-300"
          }`}
          key={type}
        >
          <input
            type="radio"
            value={type}
            checked={messageType === type}
            onChange={onChange}
           
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default MessageTypeSelector;
