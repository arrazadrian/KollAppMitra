import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
   IconAkunIjo, IconAkunPutih,
   IconHomeIjo, IconHomePutih,
   IconRiwayatIjo, IconRiwayatPutih
} from '../assets/Icons/Index'
import { IjoTua, Putih } from '../Utils/Warna';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy, updateDoc } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import { updateProses } from '../features/counterSlice';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TabItem = ({ isFocused, onPress, onLongPress, label}) => {
  const Icon = () => { 
    if(label === "Beranda") return isFocused ? <IconHomePutih/> : <IconHomeIjo/>
    if(label === "Pesanan") return isFocused ? <IconRiwayatPutih/> : <IconRiwayatIjo/>
    if(label === "Akun") return isFocused ? <IconAkunPutih/> : <IconAkunIjo/>
  }

  const[aktif,setAktif] = useState();
  const auth = getAuth();
  const db = getFirestore(app)

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  //Get aktif trsanksaksi
  useEffect(() => {
    const colRef = collection(db, "transaksi")
    const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Dalam Proses"), orderBy("waktu_dipesan","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setAktif(querySnapshot.size);
        console.log('conter sekarang: ' + querySnapshot.size)  
      });
    
    // dispatch(updateProses({ aktif }));
    
    return () => unsubscribe()
  },[]) 

  const getTokenNoticifation = async (token) => {
    console.log('Get token jalan')
    const auth = getAuth();
    const db = getFirestore(app);
    const docrefmit = doc(db, "mitra",  auth.currentUser.uid);
    getDoc(docrefmit).then(docSnap => {
      if (docSnap.exists()) {
        try {
          if (token != docSnap.data().token_notif){
              updateDoc(docrefmit, {
              token_notif: token,
              });
              console.log('Token notif mitra diperbarui')
          }
        } catch (err) {
          Alert.alert('Ada error dapetin token notif!', err.message);
        }
      } else {console.log('Tidak ada dokumen tersebut, ada salah dalam ganti notif')}
    })
  }


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      getTokenNoticifation(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // const { aktif } = useSelector(state => state.counter);

  return (
    <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon style={{
              height: 15,
              width: 15
            }}/>
            <Text style={{ 
              fontSize: 14,
              color: isFocused ? Putih : IjoTua,
              marginTop: 6}}>
            {label}
            </Text>
            { ((label === "Pesanan") && (aktif > 0))  &&
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{aktif}</Text>
              </View>
            }
    </TouchableOpacity>
  )
}

export default TabItem

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}



const styles = StyleSheet.create({
  container:{
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  badge:{
    position:'absolute',
    backgroundColor:'tomato',
    right: 5,
    bottom: 40,
    borderRadius: 10,
    height: 18,
    width: 18,
    justifyContent:'center',
    alignItems:'center',
  },
  badgeText:{
    fontSize: 10,
    color: Putih,
    textAlign:'center',
    fontWeight:'bold',
  },
});