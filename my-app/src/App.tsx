import { useState } from "react";
import MessageCard from "./components/MessageCard";

function App() {
  const [open, setOpen] = useState(false);

  const _handleClick = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App flex items-center justify-center min-h-screen">
      {!open && (
        <button
          className="bg-[#6EB1EF] letra text-sm px-[22px] h-[40px] rounded-md text-white"
          onClick={_handleClick}
        >
          Message App
        </button>
      )}
      {open && (
        <div className="dialog">
          <div className="dialog-content">
            <MessageCard onClose={_handleClose} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
