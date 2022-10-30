import { Image, StyleSheet, Text, View, Pressable, Dimensions, Alert, Modal, TouchableOpacity} from 'react-native';
import React, { useState, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna';
import { Call, Chat } from '../assets/Icons/Index';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../../Firebase/config';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { batalPMolehMitra, sampaiPM } from '../../API/firebasemethod';
import { useSelector, useDispatch } from 'react-redux';
import { resetBobot } from '../features/bobotSlice';
import { kosongkanKeranjang } from '../features/keranjangSlice';

const { width, height } = Dimensions.get('window')

const OtwScreen = ({ route }) => {

  const { 
    id_transaksi,
    id_mitra, 
    id_pelanggan, 
    jenislayanan,
    namapelanggan, 
    waktu_dipesan, 
    alamat_pelanggan,
    catatan_lokasi, 
    phonemitra, 
    phonepelanggan, 
    geo_alamat,
    estimasi_waktu,
    jarak,
    hargalayanan,
    panggilan,
     } = route.params;

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { namamitra } = useSelector(state => state.mitra);
  const { geo_mitra, alamat_mitra, geohash_mitra } = useSelector(state => state.posisi);
  const dispatch = useDispatch();

  const db = getFirestore(app)

  useFocusEffect(
    useCallback(() => {
          const unsubscribe = onSnapshot(doc(db, "transaksi", id_transaksi), (doc) => {
          if(panggilan == "Dibatalkan Pelanggan"){
            navigation.replace('HomeScreen');
            Alert.alert(
              'Pelanggan membatalkan panggilan mitra','Mohon maaf, sepertinya pelanggan berubah pikiran. Tetap semangat ya!.'
            );
          } 
            // Respond to data
            // ...
          });
          //unsubscribe();
          return () => {
            console.log('Otw Unmounted') 
            unsubscribe();
          }
    },[])
  );

  const clickLanjut =()=> {
    Alert.alert('Anda yakin sudah sampai?','Sistem akan mengingatkan pelanggan bahwa mitra sudah sampai.',
          [
            {
              text: 'Tutup',
              onPress: () => {
                console.log('Tutup dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: async () => {
                await dispatch(kosongkanKeranjang())
                await sampaiPM(id_transaksi);
                navigation.navigate("LanjutBelanjaScreen",{
                  id_transaksi: id_transaksi,
                  hargalayanan: hargalayanan,
                  // id_mitra : id_mitra, 
                  // id_pelanggan : id_pelanggan, 
                  // jenislayanan : jenislayanan,
                  // namapelanggan : namapelanggan, 
                  // waktu_dipesan : waktu_dipesan, 
                  // alamat_pelanggan : alamat_pelanggan,
                  // catatan : catatan, 
                  // phonemitra : phonemitra, 
                  // phonepelanggan : phonepelanggan, 
                  // geo_alamat : geo_alamat,
                  // geo_mitra : geo_mitra,
                  // alamat_mitra: alamat_mitra,
                  // estimasi_waktu: estimasi_waktu,
                  // jarak: jarak,
                });
              }
            }
          ]
          )
  };

  const clickBatal =()=> {
    Alert.alert('Anda yakin mau membatalkan?','Pelanggan tentunya akan kecewa bila kamu batalkan.',
          [
            {
              text: 'Tutup',
              onPress: () => {
                console.log('tutup dipencet')
              }
            },
            {
              text: 'Batalkan',
              onPress: async () => { 
                await batalPMolehMitra(id_transaksi);  
                await dispatch(resetBobot());
                navigation.replace("HomeScreen");
                console.log('batal dipencet');
              }
            }
          ]
          )
  };

  const telepon = () => {
    Linking.openURL(`tel:${phonepelanggan}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonepelanggan}`);
  };

  return (
    <View style={styles.latar}>
        <Modal
            animationType="fade"
            // animationInTiming = {13900}
            transparent={true}
            visible={modalVisible}
            // animationOut = "slide"
            swipeDirection = "down"
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.modal}>
                <View style={styles.modalView}>
                    <Text style={styles.subjudul}>Catatan Lokasi</Text>
                    <Text style={{fontSize: 14}}>{catatan_lokasi}</Text>
                    <TouchableOpacity
                    style={{ marginTop: 20}}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <Text style={{color: Ijo, fontWeight:'bold'}}>Tutup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <MapView style={styles.peta} 
            // ref={mapRef}
            initialRegion={{
              latitude: (geo_alamat.lat + geo_mitra.lat)/2,
              longitude: (geo_alamat.lng + geo_mitra.lng)/2,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
          }}>
        { geo_mitra && geo_alamat && (
            <MapViewDirections
                origin={{latitude: geo_mitra.lat, longitude:geo_mitra.lng}}
                destination={{latitude: geo_alamat.lat, longitude:geo_alamat.lng}}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeColor="green"
                strokeWidth={3}
            />
        )}
          <Marker 
            coordinate={{
            latitude: geo_alamat.lat,
            longitude: geo_alamat.lng,
            }}
            title={namapelanggan}
            description="Lokasi Pelanggan"
            pinColor={'tan'}
            identifier="pelanggan"
          />
          <Marker 
            coordinate={{
            latitude: geo_mitra?.lat,
            longitude: geo_mitra?.lng,
            }}
            title={namamitra}
            description="Lokasi Anda"
            pinColor={'red'}
            identifier="mitra"
          />
          </MapView>
      <View style={styles.bungkus}>
          <View style={{flexDirection:'row', marginBottom:10, alignItems:'center'}}>
              <Pressable style={{flex:1}} onPress={()=> navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={40} color={Ijo} />
              </Pressable>
              <View style={{flex: 4}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}} numberOfLines={1}>
                  {namapelanggan}
                </Text>
                <Text style={{fontSize:14, color:IjoTua}}>
                  {jarak} | {estimasi_waktu}
                </Text>
              </View>
              <View style={{flexDirection:'row', flex:2.2}}>
                <Pressable onPress={telepon}>
                  <Image source={Call} style={styles.icon} />
                </Pressable>
                <Pressable onPress={sms}>
                  <Image source={Chat} style={styles.icon} />
                </Pressable>
              </View>
          </View>
          <GarisBatas/>
          <View style={{marginVertical: 10}}>
            <Text style={{color: IjoTua, fontWeight:'bold', fontSize: 16}}>Tujuan Lokasi</Text>
            <Text numberOfLines={3}>{alamat_pelanggan}</Text>
          </View>
          <Pressable style={styles.catatan}
              onPress={() => {
                  setModalVisible(true);
              }}>
              { catatan_lokasi ? (
                <View>
                    <Text style={styles.subjudul}>
                        Catatan Lokasi
                    </Text>
                    <Text style={{fontSize: 14, fontStyle:'italic'}}  numberOfLines={1}>
                        {catatan_lokasi}
                    </Text>
                </View>

                ):(
                <View>
                    <Text style={{fontSize: 14, fontStyle:'italic'}}  numberOfLines={1}>
                        Tanpa catatan lokasi
                    </Text>
                </View>
                )
                }
          </Pressable>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Pressable style={styles.batal}
                onPress={clickBatal}
              >
                <Text style={styles.teksbatal}>
                  Batalkan 
                </Text>
              </Pressable>
              <Pressable style={styles.lanjut}
                onPress={clickLanjut}
              >
                <Text style={styles.tekslanjut}>
                  Sudah Sampai
                </Text>
              </Pressable>
          </View>
      </View>
      <View style={styles.tips}>
            <Text style={{fontSize: 14, color: IjoTua}}>Tekan pin kuning lalu panah biru di kanan bawah peta untuk menggunakann <Text style={{fontWeight:'bold'}}>Google Maps</Text>.</Text>
      </View>
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
  latar:{
        flex: 1,
    },
    peta:{
        width: width,
        height: height * 0.55,
    },
    bungkus:{
        width: width,
        height: height * 0.5,
        padding: 20,
        backgroundColor: Kuning,
    },
    foto:{
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
    },
    icon:{
        width: 40,
        height: 40,
        marginVertical: 5,
        marginLeft:10,
    },
    lanjut:{
        width: width * 0.4,
        backgroundColor: Ijo,
        padding: 10,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: IjoMint,
        borderWidth: 2,
    },
    batal:{
        width: width * 0.4,
        backgroundColor: IjoMint,
        padding: 10,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: IjoMint,
        borderWidth: 2,
    },
    tekslanjut:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Putih,
    },
    teksbatal:{
        fontSize: 16,
        fontWeight: 'bold',
        color: Ijo,
    },
    catatan:{
        backgroundColor:Putih,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        marginBottom: 20,
    },
    modal:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
  },
    modalView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    subjudul:{
      fontSize: 14,
      fontWeight: 'bold',
      color: IjoTua,
    },
    tips:{
      backgroundColor: IjoMint,
      padding: 10,
      borderRadius: 10,
      position:'absolute',
      top: height * 0.06,
      // left: width * 0.15,
      width: width * 0.9,
      alignSelf:'center'
    }
})