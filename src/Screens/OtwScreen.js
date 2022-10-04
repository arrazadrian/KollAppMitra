import { Image, StyleSheet, Text, View, Pressable, Dimensions, Alert, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna';
import { DPkartu } from '../assets/Images/Index';
import { Call, Chat } from '../assets/Icons/Index';
import { useNavigation } from '@react-navigation/native';
import GarisBatas from '../Components/GarisBatas';
import Ionicons from '@expo/vector-icons/Ionicons';


const { width, height } = Dimensions.get('window')

const OtwScreen = () => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // const clickLanjut = () => {
  //   navigation.navigate('LanjutBelanjaScreen')
  // }

  const clickLanjut =()=> {
    Alert.alert('Anda yakin sudah sampai?','Sistem akan mengingatkan pelanggan bahwa mitra sudah sampai.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: () => {navigation.navigate('LangsungScreen')}
            }
          ]
          )
  }

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
                    <Text style={{fontSize: 14}}>Jl. Semoga overflow banyak yg sehat sekeluarga</Text>
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
      <MapView style={styles.peta}/>
      <View style={styles.bungkus}>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
              <View>
                <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}}>
                  Sayur Aa Anri
                </Text>
                <Text style={{fontSize:16, color:IjoTua}}>
                  700m | 20 minutes
                </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                  <Image source={Call} style={styles.icon} />
                  <Image source={Chat} style={styles.icon} />
              </View>
          </View>
          <GarisBatas/>
          <View style={{marginVertical: 10}}>
            <Text style={{color: IjoTua, fontWeight:'bold', fontSize: 16}}>Tujuan Lokasi</Text>
            <Text numberOfLines={3}>Jl. Semoga overflow banyak yg sehat sekeluarga dan dilapangkan rizekinya sampai tua nanti aicusuas coashcasohacs acsuhuaihasch acoboaoabsasobca</Text>
          </View>
          <Pressable style={styles.catatan}
              onPress={() => {
                  setModalVisible(true);
              }}>
              <Text style={{color: IjoTua, fontWeight:'bold', fontSize: 16}}>Catatan Lokasi</Text>
              <Text style={{fontStyle:'italic'}} numberOfLines={1}>Jl. Semoga overflow banyak yg sehat sekeluarga dan dilapangkan rizekinya sampai tua nanti aicusuas coashcasohacs acsuhuaihasch acoboaoabsasobca</Text>
          </Pressable>
          <Pressable style={styles.lanjut}
            onPress={clickLanjut}
          >
            <Text style={styles.tekslanjut}>
              Sudah Sampai Lokasi
            </Text>
          </Pressable>
      </View>
      <Pressable style={styles.kembali} onPress={()=> navigation.goBack()}>
            <Ionicons name="chevron-back-circle-outline" size={40} color={Putih} />
      </Pressable>
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
        height: height * 0.64,
    },
    bungkus:{
        width: width,
        height: height * 0.47,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 19,
        padding: 20,
        backgroundColor: Kuning,
        position:'absolute',
        bottom: 0,
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
        marginRight:20,
    },
    lanjut:{
        backgroundColor: Ijo,
        padding: 10,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf:'center',
        top: height * 0.02,
        borderRadius: 10,
        borderColor: IjoMint,
        borderWidth: 2,
    },
    tekslanjut:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Putih,
    },
    catatan:{
        backgroundColor:Putih,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
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
    kembali:{
      borderRadius: 20,
      position:'absolute',
      top: height * 0.5,
      left: width * 0.03,
      justifyContent:'center',
      alignItems:'center',
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