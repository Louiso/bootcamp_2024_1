import React from "react";

function MessageTypeButton({
  message,
  isSelected,
  onClick,
  inputType = "radio",
}) {
  return (
    <div className="message-button-wrapper">
      <input
        type={inputType}
        id={message.id}
        name={inputType === "radio" ? "message-type" : undefined} // Solo para radio buttons
        checked={isSelected}
        onChange={() => {
          onClick(message.id);
        }} // Manejador para cambiar el valor
        className="hidden-input"
        aria-checked={isSelected} // Es importante para accesibilidad
        aria-labelledby={message.id}
      />
      <label
        htmlFor={message.id}
        className={`message-button ${isSelected ? "selected" : ""}`}
        role={inputType} // Este atributo ayuda a la accesibilidad
      >
        <div className="radio-circle">
          {inputType === "radio" && isSelected && <div className="radio-dot" />}
        </div>
        <span className="message-label">{message.label}</span>
      </label>
    </div>
  );
}

export default MessageTypeButton;
