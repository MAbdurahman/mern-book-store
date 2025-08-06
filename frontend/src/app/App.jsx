import react, {Fragment, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import HeaderComponent from '../components/HeaderComponent.jsx';
import {signOut} from '../store/auth/authSlice.js';

export default function App() {

   const dispatch = useDispatch();

   useEffect(() => {
      const verifyTokenExpiration = () => {
         try {
            const expirationTime = localStorage.getItem("expirationTime");
            if (!expirationTime) {
               return;
            }
            const isExpired = Date.now() > Number(expirationTime);

            if(isExpired) {
               dispatch(signOut());
            }

         } catch(err) {
            console.log(`  ➔  Error in verifyTokenExpiration function: - ${err.message}`);
         }
      };
      verifyTokenExpiration();
   }, [dispatch])


   return (
      <Fragment>
         <HeaderComponent/>
         <main>
            <Outlet />
         </main>
      </Fragment>
   );
}