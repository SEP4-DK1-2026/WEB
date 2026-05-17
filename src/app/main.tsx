import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { WeatherModelProvider} from "../context/WeatherModelContext"

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('../testing/mocks/browser');

    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <WeatherModelProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </WeatherModelProvider>
  );
}

void startApp();