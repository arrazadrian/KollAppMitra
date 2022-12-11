import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Alert, Dimensions, ActivityIndicator, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { KollLong, DefaultFoto } from '../assets/Images/Index';
import { usermitra } from '../Data/usermitra'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { handleSignOut } from '../../API/firebasemethod'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')

const AkunScreen = () => {
   
  const navigation = useNavigation();

  const pindahEdit = () => {
    navigation.navigate('EditScreen', { 
      nama: namaakun,
      foto: fotoakun,
      toko: tokoakun,
      phone: phoneakun, 
      waktu_buka: waktu_buka,
      waktu_tutup: waktu_tutup,
      alamat_sementara : alamat,
    })
  }

  const handleKeluarAkun =()=> {
    Alert.alert('Anda ingin keluar akun?','Anda akan butuh login kembali untuk masuk.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Ya',
              onPress: handleSignOut,
            }
          ]
          )
  }

  const [modalVisible, setModalVisible] = useState(false);

  const [namaakun, setNamaakun] = useState('')
  const [fotoakun, setFotoakun] = useState('')
  const [tokoakun, setTokoakun] = useState('')
  const [phoneakun, setPhoneakun] = useState('')
  const [emailakun, setEmailakun] = useState('')
  const [waktu_buka, setWaktu_buka] = useState('')
  const [waktu_tutup, setWaktu_tutup] = useState('')
  const [alamat, setAlamat] = useState('')
  const [rating_layanan, setRating_layanan] = useState()
  const [rating_produk, setRating_produk] = useState()
  const [poin, setPoin] = useState()
  const [tagihan, setTagihan] = useState()
  const auth = getAuth();
  const db = getFirestore(app)

  //Dapetin data mitra akun, putus listener kalo pindah halaman
  useFocusEffect(
    useCallback(() => {
          const unsubscribe = onSnapshot(doc(db, "mitra", auth.currentUser.uid ), (doc) => {
            setNamaakun(doc.data().namalengkap);
            setFotoakun(doc.data().foto_akun);
            setTokoakun(doc.data().namatoko)
            setPhoneakun(doc.data().phone);
            setEmailakun(doc.data().email);
            setWaktu_buka(doc.data().waktu_buka);
            setWaktu_tutup(doc.data().waktu_tutup);
            setAlamat(doc.data().alamat);
            setRating_layanan(doc.data().rating_layanan);
            setRating_produk(doc.data().rating_produk);
            setPoin(doc.data().poin_potongan);
            setTagihan(doc.data().tagihan);
            console.log('getuserAkun jalan (Akun Screen)')
            // Respond to data
            // ...
          });
          //unsubscribe();
          return () => {
            console.log('Akun Unmounted') 
            unsubscribe();
          }
    },[])
  );

  return (
    <View style={styles.latar}>
         <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                swipeDirection = "down"
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 18, color: Ijo, fontWeight: 'bold'}}>Info</Text>
                        <Text style={{textAlign:'center', marginVertical: 5}}>
                            Bagian Koll berasal dari 20% tiap tranksaksi dan poin potongan berasal dari voucher yang digunakan pelanggan. Total tagihan
                            harus dibayar ke akun virtual Koll tiap bulannya.
                        </Text>
                        <Ionicons name="close-circle-outline" size={30} color={Ijo} onPress={() => { setModalVisible(!modalVisible) }} />
                    </View>
                </View>
            </Modal>
        <ScrollView>
          <View style={styles.atas}>
            <Image source={KollLong} style={styles.logo}/>
          </View>
          <View style={styles.bungkus}>
            { !namaakun ? 
            (
            <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
              <ActivityIndicator size="large" color={Ijo}/>
            </View>
            ):(
              <View>
                <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Profil</Text>
                  <Pressable  onPress={pindahEdit}>
                      <Ionicons name="settings" size={20} color={Ijo} />
                  </Pressable>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginBottom: 10}}>
                  { fotoakun ? (
                    <Image source={{uri: fotoakun}} style={styles.foto}/>
                    ):(
                    <Image source={DefaultFoto} style={styles.foto}/>
                  )}
                    <View>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: Putih,}}>{namaakun}</Text>
                        <Text style={{fontSize: 16,color: Putih,}}>Mitra Pedagang</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}}>
                            <View style={{alignItems:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Ionicons name="star" size={24} color="orange" />
                                    <Text style={styles.rating}>{Number(rating_layanan).toFixed(1)}</Text>
                                </View>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Ionicons name="leaf" size={24} color="green" />
                                    <Text style={styles.rating}>{Number(rating_produk).toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, alignItems:'center', marginBottom: 5}}>
                      <Text style={{color: Ijo, fontSize: 14, fontWeight:'bold'}}>Bagi Hasil untuk Koll</Text>
                      <Ionicons name="information-circle-outline" size={14} color={Ijo} onPress={() => {setModalVisible(true)}}/>
                    </View>
                    <View style={styles.kotakpoin}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={styles.rekap}>Bagian Koll</Text>
                          <Text style={styles.rekap}>Rp{new Intl.NumberFormat('id-Id').format(tagihan).toString()}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={styles.rekap}>Poin Potongan</Text>
                          <Text style={styles.rekap}>Rp{new Intl.NumberFormat('id-Id').format(poin).toString()}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={[styles.subisi, {fontSize: 14, fontWeight:'bold'}]}>Total Tagihan</Text>
                          <Text style={[styles.subjudul, {color: Putih, fontSize: 14}]}>Rp{new Intl.NumberFormat('id-Id').format(tagihan-poin).toString()}</Text>
                      </View>
                    </View>
                </View>
                <View style={{borderBottomColor: Ijo, borderBottomWidth: 1}}>
                  <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Info</Text>
                </View>
                <View style={{paddingTop: 10}}>
                    <View style={{justifyContent:"space-between", marginBottom: 10, flexDirection:'row'}}>
                          <View style={{flex: 1}}>
                              <Text style={styles.subjudul}>Nama Toko</Text> 
                              <Text style={styles.subisi}>{tokoakun}</Text>   
                          </View>    
                          <View style={{flex: 1, paddingStart: 10}}>     
                                <Text style={styles.subjudul}>Waktu Operasional</Text> 
                                <Text style={styles.subisi}>{waktu_buka} - {waktu_tutup}</Text>   
                          </View>
                    </View>
                    <View style={{justifyContent:"space-between", marginBottom: 10, flexDirection:'row'}}>
                          <View style={{flex: 1}}>     
                                <Text style={styles.subjudul}>No.Handphone</Text> 
                                <Text style={styles.subisi}>{phoneakun}</Text>   
                          </View>
                          <View style={{flex: 1, paddingStart: 10}}>     
                                <Text style={styles.subjudul}>Email</Text> 
                                <Text style={styles.subisi}>{emailakun}</Text>   
                          </View>
                    </View>
                    <View>
                        <Text style={styles.subjudul}>Tempat Mangkal</Text>
                        <Text style={{color: Putih, fontSize: 14}} numberOfLines={3}>{alamat}</Text>
                    </View>
                </View>
                <View style={styles.logout}>
                  <Text 
                  style={{fontSize: 20, color: Ijo, fontWeight: 'bold'}}
                  onPress={handleKeluarAkun}
                  >Keluar Akun</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
    </View>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  atas:{
    alignItems:'center', 
    justifyContent:'center',
    height: height * 0.2,
    padding: 10,
  },
  logo:{
    marginTop: 10,
    width: width * 0.4,
    height: height * 0.1,
    alignSelf: 'center',
  },
  bungkus:{
    backgroundColor: IjoTua,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: height * 0.8,
  },
  foto:{
    width: 100,
    height: 100,
    backgroundColor: Putih,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating:{
    fontSize: 24,
    color: Putih,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 15,
  }, 
  kotakpoin:{
    borderColor: Ijo,
    borderRadius: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  subjudul:{
    color: Putih, 
    fontSize: 15, 
    fontWeight:'bold'
  },
  subisi:{
    color: Putih, 
    fontSize: 16, 
  },
  rekap:{
    color: Ijo, 
    fontSize: 12, 
  },
  logout:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    },
  contoh:{
      width: width * 0.6,
      height: width * 0.8,
      borderRadius: 10,
      marginVertical: 10,
  },
})