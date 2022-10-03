import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Alert, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Abu, Ijo, IjoMint, IjoTua, Kuning, Putih} from '../Utils/Warna';
import { KollLong, DefaultFoto } from '../assets/Images/Index';
import { usermitra } from '../Data/usermitra'
import { useNavigation } from '@react-navigation/native'
import { handleSignOut } from '../../API/firebasemethod'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';

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

  const [namaakun, setNamaakun] = useState('')
  const [fotoakun, setFotoakun] = useState('')
  const [tokoakun, setTokoakun] = useState('')
  const [phoneakun, setPhoneakun] = useState('')
  const [emailakun, setEmailakun] = useState('')
  const [waktu_buka, setWaktu_buka] = useState('')
  const [waktu_tutup, setWaktu_tutup] = useState('')
  const [alamat, setAlamat] = useState('')
  const auth = getAuth();
  const db = getFirestore(app)

  useEffect(() =>{
    async function getuserAkun(){
      try{
        const unsubscribe = onSnapshot(doc(db, "mitra", auth.currentUser.uid ), (doc) => {
        setNamaakun(doc.data().namalengkap);
        setFotoakun(doc.data().foto_akun);
        setTokoakun(doc.data().namatoko);
        setPhoneakun(doc.data().phone);
        setEmailakun(doc.data().email);
        setWaktu_buka(doc.data().waktu_buka);
        setWaktu_tutup(doc.data().waktu_tutup);
        setAlamat(doc.data().alamat);
        console.log('getuserAkun jalan (Akun Screen)')
          // Respond to data
          // ...
        });
        //unsubscribe();
      } catch (err){
        Alert.alert('There is an error.', err.message)
      }
    }
    getuserAkun();
  },[])

  return (
    <SafeAreaView style={styles.latar}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Image source={KollLong} style={styles.logo}/>
      </View>
      <View style={styles.bungkus}>
            <View style={{borderBottomColor: Ijo, borderBottomWidth: 1, marginBottom: 10 }}>
              <Text style={{color: Putih, fontSize: 22, fontWeight: 'bold'}}>Profil</Text>
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
                    <Pressable  onPress={pindahEdit} >
                        <View style={styles.edit}>
                          <Text style={{color: Putih, fontSize: 18, fontWeight:'bold'}}>Atur Profil</Text>
                        </View>
                    </Pressable>
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
                    { alamat ? 
                      (
                        <Text style={{color: Putih, fontSize: 14}} numberOfLines={3}>{alamat}</Text>
                        ) : (
                        <Text style={{color: Abu, fontSize: 14, fontStyle: 'italic'}}>Tambahkan dari "Atur Profil"</Text>                        
                      )
                    }
                </View>
            </View>
            <View style={styles.logout}>
              <Text 
              style={{fontSize: 20, color: Ijo, fontWeight: 'bold'}}
              onPress={handleSignOut}
              >Keluar Akun</Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default AkunScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: Kuning,
  },
  logo:{
    width: 150,
    height: 75,
    alignSelf: 'center',
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
  subjudul:{
    color: Putih, 
    fontSize: 15, 
    fontWeight:'bold'
  },
  subisi:{
    color: Putih, 
    fontSize: 16, 
  },
  edit:{
    borderColor: Ijo,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logout:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position:'absolute',
    bottom: height * 0.05,

  },
  bungkus:{
    backgroundColor: IjoTua,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 3,
  },
})