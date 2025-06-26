import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js'
import NotificationProvider from './context/notificationContext.jsx';

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <NotificationProvider>
         <App/>
      </NotificationProvider>
   </Provider>
)