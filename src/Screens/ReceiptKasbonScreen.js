import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable, ActivityIndicator, ScrollView, Alert} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DompetKasbon, KollLong, Lunas } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas'
import moment from 'moment'
import localization from 'moment/locale/id'
import { Call, Chat } from '../assets/Icons/Index'
import * as Linking from 'expo-linking'
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore"
import { app } from '../../Firebase/config'
import { lunaskanKasbon } from '../../API/firebasemethod'
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')

const ReceiptKasbonScreen = ({ navigation, route }) => {

  moment.updateLocale('id', localization);

  const handleLunas =()=> {
    Alert.alert('Anda yakin melunaskan kasbon?','Pastikan pelanggan terkait sudah membayar lunas total kasbon.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Yakin',
              onPress: melunaskanKasbon,
            }
          ]
          )
  };

  const melunaskanKasbon = () =>{
      lunaskanKasbon(id_kasbon);
      Alert.alert('Status kasbon sudah menjadi lunas','Akhirnya uang yang ditunggu pun tiba!');
      navigation.navigate('LunasScreen')
  };

  const { 
    id_kasbon, id_mitra, namamitra, namatoko, phonemitra, id_pelanngan, status_kasbon,
    namapelanggan, phonepelanggan, waktu_dibuat, total_kasbon,
     } = route.params;

     const telepon = () => {
      Linking.openURL(`tel:${phonepelanggan}`);
    };
  
    const sms = () => {
      Linking.openURL(`sms:${phonepelanggan}`);
    };

    const[transaksiKB,setTransaksiKB] = useState();
    const[loading, setLoading] = useState(true);
    const componentMounted = useRef(true);
    
    useEffect(()=>{
      const fetchTransaksikasbon = async() => {
        try{
          const list = []; 
          const db = getFirestore(app);
          const docRef = doc(db, "kasbon", id_kasbon);
          const colRef = collection(docRef, "transaksi_kasbon")
  
          const q = query(colRef, orderBy("waktu_transaksi","desc"));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const { id_transaksi, total_harga, waktu_transaksi } = doc.data();
            list.push({
              id: doc.id,
              id_transaksi,
              total_harga,
              waktu_transaksi,
            });
          });
    
            if (componentMounted.current){ // (5) is component still mounted?
              setTransaksiKB(list); // (1) write data to state
              setLoading(false); // (2) write some value to state
            }
            return () => { // This code runs when component is unmounted
                componentMounted.current = false; // (4) set it to false when we leave the page
            }
    
          } catch(err){
            console.log(err);
          }
        }
        fetchTransaksikasbon();
      },[])
    

  return (
    <View style={styles.latar}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.atas}>
          <Image source={DompetKasbon} style={styles.dompet}/>
          <View>
            <Text style={{color: IjoTua, fontSize: 16, fontWeight: 'bold', marginBottom: -5}}>Nama Toko</Text>
            <Text style={{color: Ijo, fontSize: 18, fontWeight: 'bold'}}>{namatoko}</Text>
          </View>
      </View>
      <View style={styles.bagian}>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>ID Kasbon</Text>
              <Text>{id_kasbon}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Status Kasbon</Text>
              <Text>{status_kasbon}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Mulai Tanggal</Text>
              <Text>{moment(waktu_dibuat.toDate()).calendar()}</Text>
          </View>
      </View>
      <GarisBatas/>
      <View style={styles.bagian}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View>
                <Text style={styles.subjudul}>Nama Pelanggan</Text>
                <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>{namapelanggan}</Text>
            </View>
            { status_kasbon == "Belum Lunas" && (
                <View style={{flexDirection: 'row'}}>
                  <Pressable onPress={telepon}>
                    <Image style={styles.aksi} source={Call}/>
                  </Pressable>
                  <Pressable  onPress={sms}>
                      <Image style={styles.aksi} source={Chat}/>
                  </Pressable>
                </View>
            )}
            { status_kasbon == "Lunas" && (
                <Image source={Lunas} style={{width: width * 0.2, height: width * 0.2, marginVertical:-20}}/>
            )}
          </View>
      </View>
      <GarisBatas/>
      <View style={styles.bagian}>
        <Text style={{fontSize: 16, color: IjoTua, fontWeight:'bold', marginBottom: 10 }}>Daftar Transaksi</Text>
        {loading ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
          ):(
        <View style={{marginBottom: height * 0.2}}>
          {transaksiKB.map(item => (
           <View key={item.id}>
               <View style={styles.transaksi}>
                 <View>
                   <Text style={{fontSize: 12}}> ID: {item.id_transaksi}</Text>
                   <Text style={{color:Ijo, fontSize: 16}}>{moment(item.waktu_transaksi.toDate()).calendar()}</Text>
                 </View>
                 <Text style={{color: IjoTua, fontSize: 16}}>Rp{new Intl.NumberFormat('id-Id').format(item.total_harga).toString()}</Text>
               </View> 
           </View>
         ))} 
        </View>
        )}
        
      </View>
      </ScrollView>

      <View style={styles.bawah}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 10, alignItems:'center'}}>
          <Text>Total Kasbon</Text>
          <Text style={styles.subjudul}>Rp{new Intl.NumberFormat('id-Id').format(total_kasbon).toString()}</Text>
        </View>
        { status_kasbon == "Belum Lunas" && (
        <TouchableOpacity style={styles.tombol} onPress={handleLunas}>
            <Text style={[styles.subjudul, {color: Ijo, fontSize: 20, textAlign:'center'}]}>Sudah Lunas</Text>
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ReceiptKasbonScreen

const styles = StyleSheet.create({
    latar:{
      flex: 1,
      backgroundColor: Kuning,
    },
    atas:{
      flexDirection:'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems:'center',
      justifyContent:'center',
    },
    bagian:{
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dompet:{
      width: width*0.2,
      height: height*0.06,
      marginRight: 10,
    },
    subjudul:{
      fontSize: 16,
      color: IjoTua,
      fontWeight:'bold',
    },
    transaksi:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom: 5,
      borderBottomColor: Ijo,
      borderBottomWidth: 0.2,
      paddingVertical: 5,      
    },
    bawah:{
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position:'absolute',
      bottom:0,
      width: width,
      backgroundColor:IjoMint,
      padding: 20,
    },
    tombol:{
      borderColor: Ijo,
      borderWidth: 3,
      width:'100%',
      padding: 8,
      borderRadius: 10,
    },
    aksi:{
      width: width * 0.1,
      height: width * 0.1,
      marginHorizontal: 5,
    },
})