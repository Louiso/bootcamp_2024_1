import React, { useState } from "react";

const componentTipo = ({ onNext, onCancel }) => {
    const [selectedType, setSelectedType] = useState("");

    const handleSelection = (event) => {
        setSelectedType(event.target.value);
    };

    const handleNext = () => {
        if (selectedType) {
            onNext(selectedType); 
        } else {
            alert("Por favor, seleccione un tipo de mensaje.");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Selección de tipo de mensaje</h2>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="radio"
                        value="Invitación"
                        checked={selectedType === "Invitación"}
                        onChange={handleSelection}
                    />
                    Invitación
                </label>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="radio"
                        value="Recordatorio de progreso"
                        checked={selectedType === "Recordatorio de progreso"}
                        onChange={handleSelection}
                    />
                    Recordatorio de progreso
                </label>
                <label style={{ display: "block", margin: "10px 0" }}>
                    <input
                        type="radio"
                        value="Personalizado"
                        checked={selectedType === "Personalizado"}
                        onChange={handleSelection}
                    />
                    Personalizado
                </label>
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
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default componentTipo