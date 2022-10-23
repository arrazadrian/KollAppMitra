import { StyleSheet, Text, View, Switch, Pressable, Image, ScrollView, StatusBar, SafeAreaView, Dimensions, Alert, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ijo, IjoMint, IjoTua, Putih, Kuning, Abu } from '../Utils/Warna';
import MapView, { Marker } from 'react-native-maps';
import GarisBatas from '../Components/GarisBatas';
import moment from 'moment';
import localization from 'moment/locale/id';
import Ionicons from '@expo/vector-icons/Ionicons';
import { terimaPM, tolakPM } from '../../API/firebasemethod';
import { useSelector, useDispatch } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from 'expo-location';
import { updatePosisi } from '../features/posisiSlice';
import MapViewDirections from "react-native-maps-directions";
import { updateBobot } from '../features/bobotSlice';


const { width, height } = Dimensions.get('window')

const PanggilanScreen = ({ route, navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [timer, setTimer] = useState(null);
    const [habis, setHabis] = useState(false);

    const { 
        hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
        jumlah_kuantitas, namapelanggan, produk, waktu_selesai, waktu_dipesan, alamat_pelanggan,
        status_transaksi, catatan_lokasi, phonemitra, phonepelanggan, geo_alamat,
         } = route.params;

 
    moment.updateLocale('id', localization)
    let tanggal = moment().locale('id');

    useEffect(() => {
        const durasibalas = setInterval(() => {
            let target = moment(waktu_dipesan.toDate()).add(2, 'days');
            let sekarang = new Date();
            let durasi = target.diff(sekarang, 'seconds');
            if(durasi > 0 ){
                setTimer(durasi);
            } else {
                clearInterval(durasibalas);
                setTimer("Habis");
                setHabis(true);
                Alert.alert(
                    'Waktu habis untuk merespon','Anda tidak bisa merespon permintaan ini lagi.',
                    [
                      {
                        text: 'Tutup',
                        onPress: () => {
                          navigation.replace('HomeScreen')
                        }
                      },
                    ]
                );
            }
        }, 1000);
        return() => {
            clearInterval(durasibalas);
        }
    },[]);

    const handleTerima = () =>{
        terimaPM(id_transaksi,estimasi_waktu,jarak);
        navigation.replace("OtwScreen",{
            id_transaksi: id_transaksi,
            id_mitra : id_mitra, 
            id_pelanggan : id_pelanggan, 
            jenislayanan : jenislayanan,
            namapelanggan : namapelanggan, 
            waktu_dipesan : waktu_dipesan, 
            alamat_pelanggan : alamat_pelanggan,
            catatan_lokasi : catatan_lokasi, 
            phonemitra : phonemitra, 
            phonepelanggan : phonepelanggan, 
            geo_alamat : geo_alamat,
            geo_mitra : geo_mitra,
            alamat_mitra: alamat_mitra,
            estimasi_waktu: estimasi_waktu,
            jarak: jarak,
            hargalayanan: hargalayanan,
          });
    };
  
    const handleTolak = () =>{
        tolakPM(id_transaksi);
        navigation.replace("HomeScreen");
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();
    const geofire = require('geofire-common');
    const { geo_mitra, alamat_mitra, geohash_mitra } = useSelector(state => state.posisi);
    const { estimasi_waktu, jarak } = useSelector(state => state.bobot);

    // //Dapetin posisi mitra saat ini
    // useEffect(() => {

    //     (async () => {
        
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    //     // console.log("Lat: " +location.coords.latitude);
    //     // console.log("Lng: " +location.coords.longitude);

    //     fetch(
    //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}
    //         &location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_MAPS_APIKEY}`
    //     ).then((res) => res.json())
    //     .then((data) => {
    //         //console.log(data.results[0].formatted_address);
    //         dispatch(updatePosisi({
    //         geo_mitra: {lat:location.coords.latitude, lng:location.coords.longitude},
    //         alamat_mitra: data.results[0]?.formatted_address,
    //         geohash_mitra: geofire.geohashForLocation([location.coords.latitude,location.coords.longitude])
    //         }));
    //     })
    //     })();
    // }, []); 
    
    // console.log(geo_mitra);
    // console.log(alamat_mitra);
    // console.log(geohash_mitra);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    //Dapetin jarak dan waktu perjalanan mitra ke pelanggan 
    useEffect(()=>{
       // if(!alamat_mitra||!alamat_pelanggan) return;
        const abortJar = new AbortController();

        (async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${geo_mitra.lat},${geo_mitra.lng}&destinations=${geo_alamat.lat},${geo_alamat.lng}
                &key=${GOOGLE_MAPS_APIKEY}&mode=walking`
            ,{ signal: abortJar.signal }).then((res) => res.json())
            .then((data) => {
                //console.log(data.rows[0].elements[0].duration.text);
                // console.log(data.rows[0].elements[0].distance.text);
                let dur = data.rows[0].elements[0].duration.text;
                let reg = /\d+/g;
                let arr = dur.match(reg);
                //console.log("Panjangnya "+ arr.length);
                if(arr.length == 1){
                  let  dur_id = (arr[0] + " menit");
                  dispatch(updateBobot({
                      estimasi_waktu: dur_id,
                      jarak: data.rows[0].elements[0].distance.text,
                      }));
                } else if(arr.length == 2){
                   let dur_id = (arr[0] + " jam "+ arr[1] + " menit");
                   dispatch(updateBobot({
                       estimasi_waktu: dur_id,
                       jarak: data.rows[0].elements[0].distance.text,
                       }));
                } else {  
                   let dur_id = (arr[0] + " hari "+ arr[1] + " jam " + arr[2] + " menit");
                   dispatch(updateBobot({
                       estimasi_waktu: dur_id,
                       jarak: data.rows[0].elements[0].distance.text,
                       }));
                };
            })
        })();
        return () => {
            abortJar.abort();
        };
    },[]);
    
  return (
    <View style={styles.latar}>
        <Modal
            animationType="fade"
            //animationInTiming = {13900}
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
            initialRegion={{
              latitude: geo_alamat.lat,
              longitude: geo_alamat.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
          }}>
        {/* { geo_mitra && geo_alamat && (
            <MapViewDirections
                origin={alamat_mitra}
                destination={alamat_pelanggan}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeColor="green"
                strokeWidth={3}
            />
        )} */}
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
          {/* <Marker 
            coordinate={{
            latitude: geo_mitra?.lat,
            longitude: geo_mitra?.lng,
            }}
            title={namamitra}
            description="Lokasi Anda"
            pinColor={'red'}
            identifier="mitra"
          /> */}
          </MapView>
        <View style={styles.bobot}> 
            <View style={{flex: 1}}>
                <Text style={styles.bocil}>Harga Layanan</Text>
                <Text style={styles.bobotAngka}>Rp{hargalayanan}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.bocil}>Jarak Tempuh</Text>
                <Text style={styles.bobotAngka}>{jarak}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.bocil}>Waktu Tempuh</Text>
                <Text style={styles.bobotAngka}>{estimasi_waktu}</Text>
            </View>
        </View>
      <View style={styles.bawah}>
        <View style={{marginTop: 10, flexDirection:'row'}}>
            <View style={{ flexDirection:'row'}}>
                <Pressable style={{marginRight: width * 0.13}} onPress={()=> navigation.goBack()}>
                    <Ionicons name="chevron-back-circle-outline" size={40} color={Ijo} />
                </Pressable>
                <View>
                    <Text style={[styles.subjudul, {textAlign:'center'}]}>
                        Nama Pelanggan
                    </Text>
                    <Text style={styles.nama} numberOfLines={1}>
                        {namapelanggan}
                    </Text>
                </View>
            </View>
        </View>
        <GarisBatas/>
            <Text style={styles.subjudul}>
                Alamat Tujuan
            </Text>
            <Text style={{fontSize: 14, marginBottom: 10}} numberOfLines={3}>
                {alamat_pelanggan}
            </Text>
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
            { !habis ? 
                (
                    <TouchableOpacity style={styles.terima}
                        onPress={handleTerima}
                    >
                        <Text style={{color: Putih, textAlign:'center', fontWeight:'bold', fontSize: 16}}>Terima Panggilan</Text>
                    </TouchableOpacity>
                ):(
                    <View style={[styles.terima, {backgroundColor:Abu}]}>
                        <Text style={{color: Putih, textAlign:'center', fontWeight:'bold', fontSize: 14}}>Anda, tidak bisa lagi menerima panggilan ini.</Text>
                    </View>
                )
            }
      </View>
      { !habis && 
        <TouchableOpacity style={styles.tolak}
            onPress={handleTolak}
        >
            <Text style={{color: Ijo, textAlign:'center', fontWeight:'bold', fontSize: 14}}>Tolak Panggilan</Text>
        </TouchableOpacity>
      }
        <View style={styles.timer}>
            <Text style={{textAlign:'center', fontSize: 10}}>
                Durasi Respon
            </Text>
            {  !timer ? 
            (
                <ActivityIndicator size="small" color={Ijo}/>
            ) :  timer == "Habis" ? (
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 12}}>
                Waktu Habis
                </Text>
            ):(
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 16}}>
                {timer}
                </Text>
            )
            }
             <Text style={{textAlign:'center', fontSize: 10}}>
                (detik)
            </Text>
        </View>
    </View>
  )
}

export default PanggilanScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Ijo,
        flex: 1,
    },
    peta:{
        width: width,
        height: height * 0.7,
    },
    bobot:{
        flexDirection:'row',
        backgroundColor: IjoMint,
        position: 'absolute',
        width: width,
        height: height * 0.1,
        bottom: height * 0.38,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent:'space-evenly',
        flex: 1,
    },
    bawah:{
        backgroundColor: Kuning,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width,
        height: height * 0.4,
        position:'absolute',
        bottom: 0,
    },
    bobotAngka:{
        fontSize: 16,
        textAlign:'center',
        fontWeight:'bold',
        color:IjoTua,
    },
    bocil:{
        fontSize: 12,
        textAlign:'center',
    },
    subjudul:{
        fontSize: 14,
        fontWeight: 'bold',
        color: IjoTua,
    },
    nama:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Ijo,
        textAlign:'center',
    },
    catatan:{
        padding: 10,
        borderColor: IjoTua,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Putih,
    },
    terima:{
        padding: 10,
        backgroundColor: Ijo,
        borderRadius: 10,
        marginTop: 10,
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
    tolak:{
        padding: 10,
        backgroundColor: IjoMint,
        padding: 10,
        position: 'absolute',
        top: height *  0.06,
        right: width * 0.03,
        height: height * 0.08,
        width: width * 0.3,
        justifyContent:'center',
        borderRadius: 10,
    },
    timer:{
        backgroundColor:Putih,
        padding: 10,
        position:'absolute',
        top: height *  0.06,
        left: width * 0.03,
        height: height * 0.08,
        width: width * 0.3,
        justifyContent:'center',
        borderRadius: 10,
    },
})
