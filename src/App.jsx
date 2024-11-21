import { Typography } from "@material-tailwind/react";
import ProgresoMensaje from "./components/ProgresoMensaje";

export default function App() {
  return (
    <div className="relative flex min-h-[100vh] w-screen flex-col gap-16 p-8">
      <Typography
        variant="h1"
        color="blue"
        textGradient
        className="flex h-auto items-center justify-center gap-5 text-center"
      >
        <a href="/">Generador de Mensajes</a>
        <img
          src="/burbuja-de-chat.png"
          alt="img"
          className="h-[100px] w-[100px]"
        />
      </Typography>

      <main className="mx-auto w-full max-w-4xl space-y-10">
        <ProgresoMensaje />
      </main>
    </div>
  );
}
