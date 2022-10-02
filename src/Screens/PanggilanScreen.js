import { StyleSheet, Text, View, Switch, Pressable, Image, ScrollView, StatusBar, SafeAreaView, Dimensions, Alert, TouchableOpacity, Modal, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ijo, IjoMint, IjoTua, Putih, Kuning, Abu } from '../Utils/Warna';
import MapView, { Marker } from 'react-native-maps';
import GarisBatas from '../Components/GarisBatas';
import moment from 'moment';
import localization from 'moment/locale/id';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window')

const PanggilanScreen = ({ route, navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [timer, setTimer] = useState(null)

    const { 
        hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
        jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu_selesai, waktu_dipesan, alamat_pelanggan,
        status_transaksi, catatan, phonemitra, phonepelanggan, geo_alamat,
         } = route.params;

    const handlePanggil = () =>{

    };

    const handleTolak = () =>{

    };

    moment.updateLocale('id', localization)
    let tanggal = moment().locale('id');

    useEffect(() => {
        const durasibalas = setInterval(() => {
            const target = moment(waktu_dipesan.toDate()).add(4, 'days');
            const sekarang = new Date();
            if(timer != 0 ){
                let durasi = target.diff(sekarang, 'seconds');
                setTimer(durasi);
            } else {
                setTimer("Waktu Habis");
                clearInterval(durasibalas)
            }
        }, 1000);
        return() => clearInterval(durasibalas);
    },[])
    
    
  return (
    <View style={styles.latar}>
        <Modal
            animationType="nonde"
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
                    <Text style={{fontSize: 14}}>{catatan}</Text>
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
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
          }}>
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
          </MapView>
      <View style={styles.bawah}>
        <View style={{marginTop: 10}}>
            <Text style={[styles.subjudul, {textAlign:'center'}]}>
                Nama Pelanggan
            </Text>
            <Text style={styles.nama} numberOfLines={1}>
                {namapelanggan}
            </Text>
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
                <Text style={styles.subjudul}>
                    Catatan Lokasi
                </Text>
                <Text style={{fontSize: 14, fontStyle:'italic'}}  numberOfLines={1}>
                    {catatan}
                </Text>
            </Pressable>
            <TouchableOpacity style={styles.terima}
                onPress={handlePanggil}
            >
                <Text style={{color: Putih, textAlign:'center', fontWeight:'bold', fontSize: 16}}>Terima Panggilan</Text>
            </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.tolak}
            onPress={handleTolak}
        >
            <Text style={{color: Ijo, textAlign:'center', fontWeight:'bold', fontSize: 16}}>Tolak Panggilan</Text>
        </TouchableOpacity>
        <View style={styles.timer}>
            <Text style={{textAlign:'center', fontSize: 12}}>
                Durasi merespon
            </Text>
            {   !timer ? 
            (
                <ActivityIndicator size="small" color={Ijo}/>
            ):(
                <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 16}}>
                {timer}
                </Text>
            )
            }
        </View>
        <Pressable style={styles.kembali} onPress={()=> navigation.goBack()}>
            <Ionicons name="chevron-back-circle-outline" size={40} color={Ijo} />
        </Pressable>
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
    tolak:{
        padding: 10,
        backgroundColor: IjoMint,
        borderRadius: 10,
        padding: 10,
        position: 'absolute',
        top: height *  0.06,
        right: width * 0.03,
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
    timer:{
        backgroundColor:Putih,
        padding: 10,
        position:'absolute',
        top: height *  0.06,
        left: width * 0.03,
    },
    kembali:{
        borderRadius: 20,
        position:'absolute',
        top: height * 0.58,
        left: width * 0.02,
        justifyContent:'center',
        alignItems:'center',
    },
})
