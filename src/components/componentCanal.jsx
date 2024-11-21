import React, { useState } from "react";

const componentCanal = ({ onNext, onCancel }) => {
    const [selectedChannels, setSelectedChannels] = useState([]);

    const handleChannelChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedChannels((prev) => [...prev, value]);
        } else {
            setSelectedChannels((prev) => prev.filter((channel) => channel !== value));
        }
    };

    const handleNext = () => {
        if (selectedChannels.length > 0) {
            onNext(selectedChannels); 
        } else {
            alert("Por favor, seleccione al menos un canal.");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Selección de canales</h2>

            {/* Checkboxes para seleccionar canales */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="checkbox"
                        value="Correo electrónico"
                        onChange={handleChannelChange}
                        checked={selectedChannels.includes("Correo electrónico")}
                    />
                    Correo electrónico
                </label>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="checkbox"
                        value="Mensaje de texto"
                        onChange={handleChannelChange}
                        checked={selectedChannels.includes("Mensaje de texto")}
                    />
                    Mensaje de texto
                </label>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="checkbox"
                        value="WhatsApp"
                        onChange={handleChannelChange}
                        checked={selectedChannels.includes("WhatsApp")}
                    />
                    WhatsApp
                </label>
            </div>

            {/* Botones de control */}
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
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default componentCanal;