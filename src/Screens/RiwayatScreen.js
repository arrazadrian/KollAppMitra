import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Ijo, Kuning, Hitam, Putih, IjoTua } from '../Utils/Warna'
import RiwayatCard from '../Components/RiwayatCard'
import { dataRiwayat } from '../Data/dataRiwayat'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { Receipt } from '../assets/Images/Index';


const { width, height } = Dimensions.get('window')

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
  //Tambah parameter "riwayat" bila mau auto refresh

  return (
    <View style={styles.latar}>
      {loading ? (
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