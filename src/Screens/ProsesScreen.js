import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Kuning, IjoTua } from '../Utils/Warna'
import ProsesCard from '../Components/ProsesCard'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';


const ProsesScreen = () => {

  const[proses,setProses] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchProses = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const colRef = collection(db, "transaksi")

        const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_transaksi", "==", "Dalam Proses"), orderBy("waktu_dipesan","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { 
            alamat_pelanggan,
            geo_alamat,
            catatan,
            id_mitra, 
            namamitra,
            namatoko,
            namapelanggan,
            id_pelanggan,
            waktu_dipesan,
            jenislayanan,
            status_transaksi,
            produk,
            hargasubtotal,
            hargalayanan,
            hargatotalsemua,
            jumlah_kuantitas,
            phonemitra, 
            phonepelanggan,
          } = doc.data();
          list.push({
            id: doc.id,
            alamat_pelanggan,
            geo_alamat,
            catatan,
            id_mitra, 
            namamitra,
            namatoko,
            namapelanggan,
            id_pelanggan,
            waktu_dipesan,
            jenislayanan,
            status_transaksi,
            produk,
            hargasubtotal,
            hargalayanan,
            hargatotalsemua,
            jumlah_kuantitas,
            phonemitra, 
            phonepelanggan,
          });
        });

        if (componentMounted.current){ // (5) is component still mounted?
          setProses(list); // (1) write data to state
          setLoading(false); // (2) write some value to state
        }
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

      } catch(err){
        console.log(err);
      }
    }
    fetchProses();
  },[proses])

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
          data={proses}
          renderItem= {({item}) => <ProsesCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
              <Text style={{textAlign:'center'}}>Anda tidak ada transaksi dalam proses</Text> 
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
  }
})