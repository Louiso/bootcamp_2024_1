import React, { useState } from "react";

const ComponentMensaje = ({ channels, onSubmit, onCancel }) => {
    const [messages, setMessages] = useState(
        channels.reduce((acc, channel) => {
            acc[channel] = { subject: "", message: "" }; 
            return acc;
        }, {})
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleInputChange = (channel, field, value) => {
        setMessages((prev) => ({
            ...prev,
            [channel]: {
                ...prev[channel],
                [field]: value,
            },
        }));
    };

    const handleNext = () => {
        if (currentIndex < channels.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onSubmit(messages); 
        }
    };

    const currentChannel = channels[currentIndex];

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>{currentChannel}</h2>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Asunto:</label>
                <input
                    type="text"
                    value={messages[currentChannel].subject}
                    onChange={(e) =>
                        handleInputChange(currentChannel, "subject", e.target.value)
                    }
                    style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Mensaje:</label>
                <textarea
                    value={messages[currentChannel].message}
                    onChange={(e) =>
                        handleInputChange(currentChannel, "message", e.target.value)
                    }
                    style={{ width: "100%", height: "100px", padding: "10px", boxSizing: "border-box" }}
                ></textarea>
            </div>

            <div>
                <button
                    onClick={onCancel}
                    style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#ccc",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Cancelar
                </button>
                <button
                    onClick={handleNext}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {currentIndex < channels.length - 1 ? "Siguiente" : "Finalizar"}
                </button>
            </div>
        </div>
    );
};

export default ComponentMensaje;