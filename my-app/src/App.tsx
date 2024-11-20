import { useState } from 'react';
import MessageCard from './components/MessageCard';

function App() {
  const [open, setOpen] = useState(false);

  const _handleClick = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <button onClick={_handleClick}>Abrir</button>
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