import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Kuning, IjoTua, IjoMint, Ijo } from '../Utils/Warna'
import KasbonCard from '../Components/KasbonCard'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore"
import { app } from '../../Firebase/config'
import { DompetKasbon } from '../assets/Images/Index'
import { IconHomeIjo } from '../assets/Icons/Index';
// import { 
//   pilihProdukKeranjang, 
//   totalHarga, 
//   kosongkanKeranjang,
//  } from '../features/keranjangSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from '@react-navigation/native'
// import { buatKasbonBaru, buatTransaksiTL } from '../../API/firebasemethod'

const { width, height } = Dimensions.get('window')

const LunasScreen = ({navigation}) => {

  const[lunas,setLunas] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchProses = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const colRef = collection(db, "kasbon")

        const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("status_kasbon", "==", "Lunas"), orderBy("waktu_dibuat","desc"));
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
          setLunas(list); // (1) write data to state
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
          data={lunas}
          renderItem= {({item}) => <KasbonCard item={item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image style={styles.dompet} source={DompetKasbon}/>
              <Text style={styles.none}>Tidak ada kasbon yang sudah lunas</Text> 
            </View>
          }
      />
      )}
      <TouchableOpacity style={styles.kembali} onPress={() => navigation.navigate('HomeScreen')}>
            <IconHomeIjo/>
      </TouchableOpacity>
    </View>
  )
}

export default LunasScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    kembali:{
        position:'absolute',
        backgroundColor: IjoMint,
        borderRadius: 20,
        padding: 10,
        bottom: 40,
        alignSelf: 'center',
    },
    dompet:{
      width: width * 0.4,
      height: width * 0.3,
      marginTop: height * 0.25,
      marginBottom: 10,
    },
    none:{
      fontSize: 16,
      fontWeight:'bold',
      color: Ijo,
      textAlign:'center',
      paddingHorizontal: 20,
      marginBottom: 10,
    },
})