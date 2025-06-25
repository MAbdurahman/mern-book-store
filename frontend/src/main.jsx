
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import NotificationProvider from './context/notificationContext.jsx';

createRoot(document.getElementById('root')).render(
   <NotificationProvider>
    <App />
   </NotificationProvider>
)