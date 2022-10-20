import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Kuning, IjoTua, Ijo } from '../Utils/Warna'
import ProsesCard from '../Components/ProsesCard'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { Receipt } from '../assets/Images/Index';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window')

const ProsesScreen = () => {

  const[proses,setProses] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const dispatch = useDispatch();

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
            catatan_lokasi,
            catatan_produk,
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
            panggilan,
            jarak,
            estimasi_waktu,
            pembayaran,
          } = doc.data();
          list.push({
            id: doc.id,
            alamat_pelanggan,
            geo_alamat,
            catatan_lokasi,
            catatan_produk,
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
            panggilan,
            jarak,
            estimasi_waktu,
            pembayaran,
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
  },[])
  //Tambah parameter "proses" bila mau auto refresh

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