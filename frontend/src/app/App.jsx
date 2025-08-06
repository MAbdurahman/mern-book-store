import react, {Fragment, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import HeaderComponent from '../components/HeaderComponent.jsx';

export default function App() {

   const dispatch = useDispatch();


   return (
      <Fragment>
         <HeaderComponent/>
         <main>
            <Outlet />
         </main>
      </Fragment>
   );
}