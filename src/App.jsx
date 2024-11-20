import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MessageProvider } from './context/MessageContext';
import SendMessage from './components/SendMessage';
import theme from './constants/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MessageProvider>
        <div className="app-container">
          <SendMessage />
        </div>
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;