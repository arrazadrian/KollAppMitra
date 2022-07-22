import { LogBox } from 'react-native'
import React, {useEffect, useState} from 'react'
import { AppUtama, Gerbang } from './Router/Index'
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
import { 
    getAuth, 
    onAuthStateChanged, 
   } from "firebase/auth";


const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)

    const userhandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null)

    const auth = getAuth();

    useEffect(
        () => {
        onAuthStateChanged(auth, user => userhandler(user))
    })

  return <>{currentUser? <AppUtama/> : <Gerbang/>}</>

}

export default AuthNavigation