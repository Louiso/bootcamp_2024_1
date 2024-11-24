import React from "react";
import { Channel } from "../components/MessageCard/index";

interface PreviewSectionProps {
  channel: Channel;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  channel,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {channel.subject !== undefined && (
        <label className="flex flex-col space-y-2">
          <span className="letra font-light text-xs">Asunto:</span>
          <input
            type="text"
            onChange={onChange}
            value={channel.subject}
            name="subject"
            className="border placeholder:letra text-sm py-4 px-3 rounded-md p-2"
            placeholder="Escribe ..."
          />
        </label>
      )}
      <label className="flex flex-col space-y-2">
        <span className="letra font-light text-xs">Mensaje:</span>
        <textarea
          onChange={onChange}
          value={channel.body}
          name="body"
          className="border placeholder:letra text-sm py-4 px-3 rounded-md p-2"
          placeholder="Escribe ..."
        />
      </label>
    </div>
  );
};

export default PreviewSection;
