import React from "react";
import { Channel } from "../components/MessageCard/index";

interface PreviewSectionProps {
  channel: Channel;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ channel, onChange }) => {
  return (
    <div>
      {channel.subject !== undefined && (
        <label>
          Asunto:
          <input
            type="text"
            onChange={onChange}
            value={channel.subject}
            name="subject"
          />
        </label>
      )}
      <label>
        Mensaje:
        <textarea
          onChange={onChange}
          value={channel.body}
          name="body"
        />
      </label>
    </div>
  );
};

export default PreviewSection;