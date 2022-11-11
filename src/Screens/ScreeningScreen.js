import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { app } from '../../Firebase/config'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { handleSignOutAwal } from '../../API/firebasemethod'
import { useNavigation } from '@react-navigation/native'


const ScreeningScreen = () => {

    const navigation = useNavigation();
    useEffect(()=>{
        let unmounted = false
        const getData = () =>{
            const auth = getAuth();
            const db = getFirestore(app);
            
            const docrefakun = doc(db, "mitra", auth.currentUser.uid);
            getDoc(docrefakun).then(docSnap => {
                if (docSnap.exists()) {
                    navigation.replace("HomeScreen")
                } else {
                    handleSignOutAwal()
                    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
                }
            })
        }

       if(!unmounted){
           getData()
       }

       return() =>{ 
        unmounted = true
        console.log('get data cleared')
       }
    },[])

  return (
    <View style={styles.latar}>
        <ActivityIndicator  size="large" color={Ijo} />
    </View>
  )
}

export default ScreeningScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }
})