import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js'
import NotificationProvider from './context/notificationContext.jsx';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CartPage from './pages/CartPage.jsx';
import PrivateRouteComponent from './components/PrivateRouteComponent.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';


const router = createBrowserRouter(createRoutesFromElements(
   <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="" element={<PrivateRouteComponent />} >
         <Route path="/shipping" element={<ShippingPage />} />
         <Route path="/payment" element={<PaymentPage />} />
         <Route path="/place-order" element={<PlaceOrderPage />} />
         <Route path="/order/:orderId" element={<OrderPage />} />
         <Route path="/profile" element={<ProfilePage />} />
      </Route>
   </Route>
));

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <NotificationProvider>
         <RouterProvider router={router} />
      </NotificationProvider>
   </Provider>
)