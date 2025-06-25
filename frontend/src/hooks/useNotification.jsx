import {useContext} from "react";
import {NotificationContext} from '../context/notificationContext.jsx'

export default function useNotification() {
   return useContext(NotificationContext);
}