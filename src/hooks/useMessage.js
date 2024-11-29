import { useContext } from "react";
import { MensajeContext } from "../context/MesajeContext";

export function useMessage() {
  const context = useContext(MensajeContext);

  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return context;
}
