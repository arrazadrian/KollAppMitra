import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image} from 'react-native'
import React, { useState, useCallback } from 'react'
import { Ijo, Kuning, IjoTua } from '../Utils/Warna'
import RiwayatCard from '../Components/RiwayatCard'
// import { dataRiwayat } from '../Data/dataRiwayat'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { Receipt } from '../assets/Images/Index';
import { useFocusEffect } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')

const RiwayatScreen = () => {

  const[riwayat,setRiwayat] = useState();

  //Dapetin data proses, putus listener kalo pindah halaman
  useFocusEffect(
    useCallback(() => {
      const auth = getAuth();
      const db = getFirestore(app);
      const colRef = collection(db, "transaksi");
      const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Selesai"), orderBy("waktu_selesai","desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listRiwayat = []; 
        querySnapshot.forEach(doc => listRiwayat.push({...doc.data(), id: doc.id}));
        setRiwayat(listRiwayat);
      });
      return () => {
        console.log('Riwayat Unmounted'); 
        unsubscribe();
      }
    },[])
  );

  return (
    <View style={styles.latar}>
      {!riwayat ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:10}} 
          data={riwayat}
          renderItem= {({item}) => <RiwayatCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Image style={styles.kertas} source={Receipt}/>
            <Text style={styles.none}>Belum pernah ada transaksi</Text> 
          </View>
        }
      />
      )}
    </View>
  )
}

export default RiwayatScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  kertas:{
    width: width * 0.4,
    height: width * 0.4,
    marginTop: height * 0.25,
    marginBottom: 10,
  },
  none:{
    fontSize: 16,
    fontWeight:'bold',
    color: Ijo,
    textAlign:'center',
    paddingHorizontal: 20,
  },
})