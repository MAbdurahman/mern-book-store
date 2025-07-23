import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js'
import NotificationProvider from './context/notificationContext.jsx';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';


const router = createBrowserRouter(createRoutesFromElements(
   <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
   </Route>
));

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <NotificationProvider>
         <RouterProvider router={router} />
      </NotificationProvider>
   </Provider>
)