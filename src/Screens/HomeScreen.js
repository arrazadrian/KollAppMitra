import { StyleSheet, Text, View, Switch, Pressable, Image, ScrollView, StatusBar, Dimensions, Alert, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ijo, IjoMint, IjoTua, Kuning, Putih,  } from '../Utils/Warna';
import { DompetKasbon, Gerobak, PreOrder, TemuLangsung } from '../assets/Images/Index';
import moment from 'moment';
import localization from 'moment/locale/id';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import { updatestatus, updatemangkal } from '../../API/firebasemethod';
import { useDispatch, useSelector } from 'react-redux';
import { setMitra } from '../features/mitraSlice';
import { updatePosisi } from '../features/posisiSlice';
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from 'expo-location';
import { kosongkanKeranjang } from '../features/keranjangSlice';
import { resetPelanggan } from '../features/pelangganSlice';


const { width, height } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
  const [status, setStatus] = useState();
  const [penjelasan, setPenjelasan] = useState();
  const [mangkal, setMangkal] = useState();
  const [yatidak, setYatidak] = useState();
  const [isStatusEnabled, setIsStatusEnabled] = useState();
  const [isMangkalEnabled, setIsMangkalEnabled] = useState();
  
  const dispatch = useDispatch();
  const { alamat_mitra } = useSelector(state => state.posisi);

  //Untuk mendapatkan status saat ini,
  useEffect(() => {
    async function getStatus(){
      const auth = getAuth();
      const docRef = doc(db, "mitra", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
          if(docSnap.data().status_sekarang == "Tidak Aktif"){
            setIsStatusEnabled(false);
            setIsMangkalEnabled(false);
            setStatus("Tidak Aktif");
            setPenjelasan("tidak");
            setMangkal("Tidak");
            setYatidak("bisa");
          } else if (docSnap.data().status_sekarang == "Aktif" && docSnap.data().mangkal == true){
            setIsStatusEnabled(true);
            setIsMangkalEnabled(true);
            setStatus("Aktif");
            setPenjelasan("aktif");
            setMangkal("Ya");
            setYatidak("tidak bisa");
          } else {
            setIsStatusEnabled(true);
            setIsMangkalEnabled(false);
            setStatus("Aktif");
            setPenjelasan("aktif");
            setMangkal("Tidak");
            setYatidak("bisa");
          };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      };
    };
    getStatus();
  },[])

  
  function toggleSwitchStatus() {
    if(!isStatusEnabled){
      setIsStatusEnabled(true)
      updatestatus(!isStatusEnabled)
      setStatus('Aktif')
      setPenjelasan('aktif')
      //console.log(status)
      //console.log(isEnabled)
    } else {
      setIsStatusEnabled(false)
      updatestatus(!isStatusEnabled)
      setStatus('Tidak Aktif')
      setPenjelasan('tidak')
      if(mangkal == "Ya"){
        setMangkal('Tidak')
        setYatidak('bisa')
        updatemangkal(!isMangkalEnabled)
        setIsMangkalEnabled(false)
      } 
      //console.log(status)
      //console.log(isEnabled)
    }
    //setIsStatusEnabled(previousState => !previousState)
  }

  function toggleSwitchMangkal() {
    if(!isMangkalEnabled){
      setIsMangkalEnabled(true)
      updatemangkal(!isMangkalEnabled)
      setMangkal('Ya')
      setYatidak('tidak bisa')
      //console.log(status)
      //console.log(isEnabled)
    } else {
      setIsMangkalEnabled(false)
      updatemangkal(!isMangkalEnabled)
      setMangkal('Tidak')
      setYatidak('bisa')
      //console.log(status)
      //console.log(isEnabled)
    }
    //setIsMangkalEnabled(previousState => !previousState)
  }

  moment.updateLocale('id', localization)
  let tanggal = moment().locale('id');

  const [namamitra, setNamamitra] = useState("Loading...");
  const [namatoko, setNamatoko] = useState("Loading...");
 
  const auth = getAuth();
  const db = getFirestore(app)

  useEffect(() =>{ 
    async function getuserHome(){
      try{      
        const unsubscribe = onSnapshot(doc(db, "mitra", auth.currentUser.uid ), (doc) => {
        setNamamitra(doc.data().namalengkap);
        setNamatoko(doc.data().namatoko);
        
        console.log('getuserHome jalan (Home Screen)')
        console.log(namamitra)
        console.log(namatoko)
        // Respond to data
        
      });
      console.log('Masuk Redux namamitra');
      //unsubscribe();
      } catch (err){
        Alert.alert('There is an error.', err.message)
      }
    }
    getuserHome();
    dispatch(setMitra({ namamitra, namatoko }));
  },[namatoko])

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const geofire = require('geofire-common');


  useEffect(() => {
      (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("Lat: " +location.coords.latitude);
      // console.log("Lng: " +location.coords.longitude);

      fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}
          &location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json())
      .then((data) => {
          //console.log(data.results[0].formatted_address);
          dispatch(updatePosisi({
          geo_mitra: {lat:location.coords.latitude, lng:location.coords.longitude},
          alamat_mitra: data.results[0]?.formatted_address,
          geohash_mitra: geofire.geohashForLocation([location.coords.latitude,location.coords.longitude])
          }));
      })
      })();
  }, []); 
  

  return ( 
    <View style={styles.latar}>
      { !alamat_mitra ?
          (
            <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                 <ActivityIndicator size="large" color={IjoTua}/>
                 <Text style={{textAlign:'center', color: Ijo, fontSize: 18, marginTop: 10}}>Mencari lokasi kamu...</Text>
            </View>
          ):(
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={{
                flexDirection: 'row',
                alignItems:'center',
                marginBottom: 20,
                }}>
                <View style={{flex:1}}>
                  <Text style={{
                    fontSize: 20,
                    color: Ijo,
                    marginBottom: -7,
                  }}>Selamat Datang!</Text>
                  <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: IjoTua,
                  }}>{namamitra}</Text>
                  <Text style={{
                    fontSize: 14,
                    color: IjoTua,
                  }}>Pengelola <Text style={{fontWeight: 'bold',}}> {namatoko}</Text></Text>
                </View>
                <View style={{flex:1, left: width * 0.07}}>
                  <Text style={{color: Ijo, fontSize:16}}>Hari ini:</Text>
                  <Text style={{color: Ijo, fontWeight:'bold'}}>{tanggal.format('dddd, DD MMM YYYY')}</Text>
                </View>
              </View>
              <View style={styles.status}>
              <View>
                  <Text style={styles.judul}>Status anda: 
                  <Text> </Text>
                  <Text style={{color: IjoTua}}>{status}</Text>
                  </Text>
                  <Text style={styles.deskripsi}>Anda sedang {penjelasan} berjualan.</Text>
              </View>
                { isStatusEnabled == null ? 
                  (
                    <ActivityIndicator size="small" color={IjoTua}/>
                  ):(
                    
                    <Switch
                      trackColor={{ false: '#767577', true: Ijo }}
                      thumbColor={isStatusEnabled ?  '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitchStatus}
                      value={isStatusEnabled}
                    />
                  )
                }
            </View>          
              { status == "Aktif" ? (
                  <View style={styles.mangkal}>
                    <View>
                        <Text style={styles.judul}>Anda mangkal? 
                        <Text> </Text>
                        <Text style={{color: IjoTua}}>{mangkal}</Text>
                        </Text>
                        <Text style={styles.deskripsi}>Anda {yatidak} dipanggil pelanggan via aplikasi.</Text>
                    </View>
                    { isMangkalEnabled == null ? 
                      (
                        <ActivityIndicator size="small" color={IjoTua}/>
                      ):(
                        <Switch
                          trackColor={{ false: '#767577', true: Ijo }}
                          thumbColor={isMangkalEnabled ? '#f5dd4b' : '#f4f3f4'  }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchMangkal}
                          value={isMangkalEnabled}
                        />
                      )
                    }
                  </View>
                ):(
                  <View style={{marginBottom:10}}/>
                )
              }
              <View>
                <Text style={styles.judul} onPress={() => navigation.push('OtwScreen')}>Keperluan Toko</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Pressable style={styles.card} onPress={() => navigation.push('ProdukScreen')}>
                      <Image source={Gerobak} style={styles.gambar}/>
                      <Text style={styles.cardtext}>Produk Utama</Text>
                    </Pressable>
                    <Pressable style={styles.card} 
                    onPress={() => navigation.push('PreOrderScreen')}>
                      <Image source={PreOrder} style={styles.gambar}/>
                      <Text style={styles.cardtext}>Produk Pre-Order</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.kasbon} onPress={() => {
                    navigation.push('Kasbon')
                    }}>
                    <View>
                      <Text style={styles.texttemu}>Catatan Kasbon</Text>
                      <Text style={styles.deskripsi}
                      >Daftar pinjaman pelanggan</Text>
                    </View>
                    <Image source={DompetKasbon} style={styles.gambardompet}/>
                  </Pressable>
                  <Text style={styles.judul}>Bertemu di Jalan?</Text>
                  <Pressable style={styles.langsung} onPress={ async () => {
                    await dispatch(kosongkanKeranjang());
                    await dispatch(resetPelanggan());
                    navigation.push('LangsungScreen')
                    }}>
                    <View>
                      <Text style={styles.texttemu}>Temu Langsung</Text>
                      <Text style={styles.deskripsi}
                        numberOfLines={2}
                      >Buat transaksi baru saat bertemu</Text>
                    </View>
                    <Image source={TemuLangsung} style={styles.gambartemu}/>
                  </Pressable>
              </View>
            </ScrollView>
          )
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:StatusBar.currentHeight + 10,
  },
  syarat: {
    backgroundColor: IjoMint,
    padding: 10,
    borderRadius: 10,
    borderColor: Ijo,
    borderWidth: 1,
    marginBottom: 10,
  },
  status: {
    backgroundColor: Putih,
    padding: 10,
    borderRadius: 10,
    borderColor: Ijo,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mangkal: {
    backgroundColor: IjoMint,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: Ijo,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Ijo,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
    flexWrap: 'wrap',
    width: width * 0.6 ,
  },
  cardtext:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
    flex: 2,
    marginLeft: 10,
  },
  card:{
    flexDirection: 'row',
    backgroundColor: Putih,
    width:  width*0.43,
    height: width*0.20,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: Ijo,
    alignItems: 'center',
    justifyContent:'space-between',
    elevation: 3,
    padding:10,
  },
  gambar:{
    width: width * 0.15,
    height: width * 0.16,
    borderRadius: 10,
    flex: 1.4,
  },
  langsung:{
    width: '100%',
    height: height*0.14,
    backgroundColor: Putih,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kasbon:{
    width: '100%',
    height: height*0.1,
    backgroundColor: Putih,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gambartemu:{
    width: width*0.25,
    height: width*0.25,
    borderRadius: 10,
  },
  gambardompet:{
    width: width*0.18,
    height: width*0.13,
    borderRadius: 10,
  },
  texttemu:{
    fontSize: 18,
    fontWeight: 'bold',
    color: IjoTua,
  },
})