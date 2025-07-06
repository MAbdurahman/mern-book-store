import react, {Fragment, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent.jsx';
export default function App() {

   return (
      <Fragment>
         <HeaderComponent/>

      </Fragment>
   );
}