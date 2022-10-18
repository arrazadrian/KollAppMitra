import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image, Pressable} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Kuning, IjoTua, Ijo } from '../Utils/Warna'
import KasbonCard from '../Components/KasbonCard'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore"
import { app } from '../../Firebase/config'
import { DompetKasbon } from '../assets/Images/Index';
import { useDispatch, useSelector } from 'react-redux'

const AdaKasbonScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const { kodeUID, namapelanggan } = useSelector(state => state.pelanggan);
  const { namamitra, namatoko } = useSelector(state => state.mitra);

  const[adakasbon,setAdaKasbon] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchProses = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const colRef = collection(db, "kasbon")

        const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("id_pelanggan", "==", kodeUID), where("status_kasbon", "==", "Belum Lunas"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { 
            id_mitra, 
            namamitra,
            namatoko,
            id_pelanggan,
            namapelanggan,
            status_kasbon,
            waktu_dibuat,
            transaksi,
            total_kasbon,
          } = doc.data();
          list.push({
            id: doc.id,
            id_mitra, 
            namamitra,
            namatoko,
            id_pelanggan,
            namapelanggan,
            status_kasbon,
            waktu_dibuat,
            transaksi,
            total_kasbon,
          });
        });
        
        if (componentMounted.current){ // (5) is component still mounted?
          setAdaKasbon(list); // (1) write data to state
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
          data={adakasbon}
          renderItem= {({item}) => <KasbonCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image style={styles.kertas} source={DompetKasbon}/>
              <Text style={styles.none}>Pelanggan sedang tidak punya kasbon yang belum dibayar</Text> 
              <Pressable style={styles.tombol}>
                Buat Kasbon Baru
              </Pressable> 
            </View>
          }
      />
      )}
    </View>
  )
}

export default AdaKasbonScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    tombol:{
      borderColor: Ijo,
      borderWidth: 3,
      width:'100%',
      padding: 8,
      borderRadius: 10,
    },
})