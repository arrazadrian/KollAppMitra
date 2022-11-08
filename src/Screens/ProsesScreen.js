import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image} from 'react-native'
import React, { useState, useCallback } from 'react'
import { Kuning, IjoTua, Ijo } from '../Utils/Warna'
import ProsesCard from '../Components/ProsesCard'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { Receipt } from '../assets/Images/Index';
// import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

const ProsesScreen = () => {

  const[proses,setProses] = useState();

  //Dapetin data proses, putus listener kalo pindah halaman
  useFocusEffect(
    useCallback(() => {
      const auth = getAuth();
      const db = getFirestore(app);
      const colRef = collection(db, "transaksi");
      const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Dalam Proses"), orderBy("waktu_dipesan","desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const listProses = []; 
        querySnapshot.forEach(doc => listProses.push({...doc.data(), id: doc.id}));
        setProses(listProses);
      });
      return () => {
        console.log('Proses Unmounted'); 
        unsubscribe();
      }
    },[])
  );

  return (
    <View style={styles.latar}>
      {!proses ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:10}} 
          data={proses}
          renderItem= {({item}) => <ProsesCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image style={styles.kertas} source={Receipt}/>
              <Text style={styles.none}>Tidak ada transaksi dalam proses</Text> 
            </View>
          }
      />
      )}
    </View>
  )
}

export default ProsesScreen

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