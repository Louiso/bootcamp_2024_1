import React from "react";

const ComponentFinal = ({ data, onCancel, onSubmit }) => {
    const handleSend = () => {
        console.log("Datos enviados:", JSON.stringify(data, null, 2)); 
        alert("¡Datos guardados correctamente!"); 
        onSubmit(); 
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Confirmación</h2>
            <p>¿Deseas enviar los datos seleccionados?</p>
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
                    onClick={handleSend}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ComponentFinal;