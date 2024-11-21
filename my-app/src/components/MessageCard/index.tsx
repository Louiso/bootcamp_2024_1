import React, { FC, useCallback, useMemo, useState } from "react";
import { produce } from "immer";
import { toast } from "sonner";
import {
  ChannelType,
  MessageType,
  sectionBy,
  SectionCode,
  templateConfigs,
} from "./constans";
import MessageTypeSelector from "../../ui/MessageTypeSelector";
import ChannelTypeSelector from "../../ui/ChannelTypeSelector";
import PreviewSection from "../../ui/PreviewSection";

const initFlow = [SectionCode.SelectMessageType, SectionCode.SelectChannelType];

interface MessageCardProps {
  onClose?: () => void;
}

export interface Channel {
  type: string;
  subject?: string;
  body?: string;
}

type IMessageType = keyof typeof MessageType;

const MessageCard: FC<MessageCardProps> = ({ onClose }) => {
  const [messageType, setMessageType] = useState<IMessageType>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [sections, setSections] = useState(initFlow.map((code) => sectionBy[code]));
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const currentSection = useMemo(() => sections[currentSectionIndex], [currentSectionIndex, sections]);

  const _handleClickPrev = () => {
    const newCurrentSectionIndex = currentSectionIndex - 1;
    if (newCurrentSectionIndex >= 0) setCurrentSectionIndex(newCurrentSectionIndex);
    if (currentSection.code.includes("Preview")) setCurrentChannelIndex((prev) => prev - 1);
  };

  const _handleClickNext = () => {
    if (currentSection.code === SectionCode.SelectMessageType && !messageType) {
      toast.error("Por favor, selecciona un tipo de mensaje.");
      return;
    }

    const newCurrentSectionIndex = currentSectionIndex + 1;
    let newSections = Array.from(sections);

    if (currentSection.code === SectionCode.SelectChannelType) {
      newSections = [
        ...sections.slice(0, newCurrentSectionIndex),
        ...channels.map((channel) => sectionBy[`Preview${channel.type}`]),
      ];

      setChannels((channels) =>
        channels.map((channel) => {
          const channelConfig = templateConfigs.find(
            (templateConfig) =>
              templateConfig.type === messageType &&
              templateConfig.channel === channel.type
          )!;
          return {
            type: channel.type,
            body: channelConfig.body,
            subject: channelConfig.subject,
          };
        })
      );

      setSections(newSections);
      setCurrentChannelIndex(0);
    }

    if (currentSection.code.includes("Preview")) setCurrentChannelIndex((prev) => prev + 1);
    if (newCurrentSectionIndex <= newSections.length - 1) setCurrentSectionIndex(newCurrentSectionIndex);
  };

  const _handleChangeMessageType = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setMessageType(value as IMessageType);
    toast.success(`Tipo de mensaje seleccionado: ${value}`);
  };

  const _handleChangeChannelItem = useCallback(
    ({ target: { checked, name } }: React.ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        const newChannels = [...channels, { type: name, subject: "", body: "" }];
        setChannels(
          [ChannelType.Email, ChannelType.Sms, ChannelType.Whatsapp]
            .map((channelType) => newChannels.find((channel) => channel.type === channelType)!)
            .filter(Boolean)
        );
        toast.success(`Canal seleccionado: ${name}`);
      } else {
        const newChannels = channels.filter((channel) => channel.type !== name);
        setChannels(newChannels);
        toast.success(`Canal deseleccionado: ${name}`);
      }
    },
    [channels]
  );

  const _handleChangeText = useCallback(
    ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setChannels((prevChannels) =>
        produce(prevChannels, (draftChannels) => {
          const channel = draftChannels[currentChannelIndex];
          channel[name as keyof Channel] = value;
        })
      );
    },
    [currentChannelIndex]
  );

  const _handleSubmit = () => {
    const obj = { userIds: [], messageType, channels };
    console.log("obj", obj);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Enviando mensaje...",
        success: "Mensaje enviado con éxito",
        error: "Error al enviar el mensaje",
      }
    );
  };

  const content = useMemo(() => {
    switch (currentSection.code) {
      case SectionCode.SelectMessageType:
        return <MessageTypeSelector messageType={messageType} onChange={_handleChangeMessageType} />;
      case SectionCode.SelectChannelType:
        return <ChannelTypeSelector channels={channels} onChange={_handleChangeChannelItem} />;
      case SectionCode.PreviewEmail:
      case SectionCode.PreviewWhatsapp:
      case SectionCode.PreviewSms:
        return <PreviewSection channel={channels[currentChannelIndex]} onChange={_handleChangeText} />;
      default:
        return null;
    }
  }, [currentSection.code, messageType, channels, currentChannelIndex, _handleChangeMessageType, _handleChangeChannelItem, _handleChangeText]);

  return (
    <div className="message-card p-5 border rounded-md w-[390px] h-[351px]">
      <h2 className="font-bold text-lg letra mb-5">{currentSection.title}</h2>
      <div>{content}</div>
      <div className="flex actions space-x-[6px] mt-[24px] justify-end">
        {currentSectionIndex === 0 ? (
          <button className="w-[102px] h-[40px] border text-[#6EB1EF] border-[#6EB1EF] rounded-md letra text-sm" onClick={onClose}>Cancelar</button>
        ) : (
          <button className="w-[102px] h-[40px] border text-[#6EB1EF] border-[#6EB1EF] rounded-md letra text-sm" onClick={_handleClickPrev}>Atrás</button>
        )}
        {currentSectionIndex === sections.length - 1 && currentSection.code !== SectionCode.SelectChannelType ? (
          <button className="w-[102px] h-[40px] border rounded-md bg-[#6EB1EF] text-white letra text-sm" onClick={_handleSubmit}>Enviar</button>
        ) : (
          <button className="w-[102px] h-[40px] border rounded-md bg-[#6EB1EF] text-white letra text-sm" onClick={_handleClickNext}>Siguiente</button>
        )}
      </div>
    </div>
  );
};

export default MessageCard;