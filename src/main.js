import './styles.css';
import { createApp } from './app.js';

createApp().catch((error) => {
  console.error(error);
  const statusMessage = document.querySelector('#status-message');

  if (statusMessage) {
    statusMessage.textContent =
      'The app shell loaded, but the startup state could not be initialized.';
  }
});
