import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
   IconAkunIjo, IconAkunPutih,
   IconHomeIjo, IconHomePutih,
   IconRiwayatIjo, IconRiwayatPutih
} from '../assets/Icons/Index'
import { IjoTua, Putih } from '../Utils/Warna';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import { updateProses } from '../features/counterSlice';


const TabItem = ({ isFocused, onPress, onLongPress, label}) => {
  const Icon = () => { 
    if(label === "Beranda") return isFocused ? <IconHomePutih/> : <IconHomeIjo/>
    if(label === "Pesanan") return isFocused ? <IconRiwayatPutih/> : <IconRiwayatIjo/>
    if(label === "Akun") return isFocused ? <IconAkunPutih/> : <IconAkunIjo/>
  }

  const[aktif,setAktif] = useState();
  const auth = getAuth();
  const db = getFirestore(app)
  const dispatch = useDispatch();

  //Get aktif trsanksaksi
  useEffect(() => {
    const colRef = collection(db, "transaksi")

    const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Dalam Proses"), orderBy("waktu_dipesan","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setAktif(querySnapshot.size)
        console.log('conter sekarang: ' + querySnapshot.size)
    });
    //unsubscribe();

    dispatch(updateProses({ aktif }));
    
    return () => unsubscribe()
  },[]) 

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