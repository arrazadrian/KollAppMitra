import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Ijo, Kuning, Hitam, Putih, IjoTua } from '../Utils/Warna'
import RiwayatCard from '../Components/RiwayatCard'
import { dataRiwayat } from '../Data/dataRiwayat'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';


const RiwayatScreen = () => {

  const[riwayat,setRiwayat] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchRiwayat = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const colRef = collection(db, "transaksi")

        const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Selesai"), orderBy("waktu_selesai","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { 
            hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, jenislayanan, 
            jumlah_kuantitas, namamitra,  namatoko, namapelanggan, produk, waktu_selesai, waktu_dipesan, status_transaksi,
            catatan,
          } = doc.data();
          list.push({
            id: doc.id,
            hargalayanan,
            hargasubtotal,
            hargatotalsemua,
            id_mitra,
            id_pelanggan,
            jenislayanan,
            jumlah_kuantitas,
            namamitra,
            namatoko,
            namapelanggan,
            produk,
            waktu_selesai,
            waktu_dipesan, 
            status_transaksi,
            catatan,
          });
        });

        if (componentMounted.current){ // (5) is component still mounted?
          setRiwayat(list); // (1) write data to state
          setLoading(false); // (2) write some value to state
        }
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

      } catch(err){
        console.log(err);
      }
    }
    fetchRiwayat();
  },[])


  return (
    <View style={styles.latar}>
      {loading ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}} 
          data={riwayat}
          renderItem= {({item}) => <RiwayatCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
          <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{textAlign:'center'}}>Anda belum pernah membuat transaksi</Text> 
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
})