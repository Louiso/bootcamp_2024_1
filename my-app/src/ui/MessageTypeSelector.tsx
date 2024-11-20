import React from "react";
import { MessageType } from "../components/MessageCard/constans";

interface MessageTypeSelectorProps {
  messageType: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({ messageType, onChange }) => {
  return (
    <div>
      {Object.values(MessageType).map((type) => (
        <label key={type}>
          <input
            type="radio"
            value={type}
            checked={messageType === type}
            onChange={onChange}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default MessageTypeSelector;