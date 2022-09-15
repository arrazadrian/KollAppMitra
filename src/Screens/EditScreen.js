import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { DefaultFoto } from '../assets/Images/Index';
import { Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { updateakunTanpafoto, updateakunDenganfoto } from '../../API/firebasemethod';
import * as ImagePicker from 'expo-image-picker';


const { width, height } = Dimensions.get('window')

const EditScreen = ({navigation, route}) => {

  const { nama, foto, toko, phone } = route.params;

  const [namaakun, setNamaakun] = useState(nama)
  const [fotoakun, setFotoakun] = useState(foto)
  const [tokoakun, setTokoakun] = useState(toko)
  const [phoneakun, setPhoneakun] = useState(phone)
  const auth = getAuth();
  const db = getFirestore(app)

  const fotolama = foto;

  // useEffect(() => {
  //   async function getuserAkun(){
  //     try {
  //       let docRef = doc(db, "mitra", auth.currentUser.uid, );
  //       const docSnap = await getDoc(docRef);
  //       setNamaakun(docSnap.data().namalengkap);
  //       setFotoakun(docSnap.data().foto_akun);
  //       setTokoakun(docSnap.data().namatoko);
  //       setPhoneakun(docSnap.data().phone);
  //       console.log('getuserAkun jalan (Akun Screen)')
  //     } catch (err){
  //     Alert.alert('There is an error.', err.message)
  //     }
  //   }
  //   getuserAkun();
  // },[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFotoakun(result.uri);
      console.log(result.uri);
    }
    
    return result.uri
    
  };


  const handleperbaruiakun = async () =>{
    if ( !fotoakun || fotoakun == fotolama){
        if (!namaakun) {
          Alert.alert('Nama lengkap masih kosong','Isi nama lengkap anda.');
        } else if (!tokoakun) {
          Alert.alert('Nama toko masih kosong','Isi nama toko anda.');
        } else if (!phoneakun && 9 < phoneakun.length < 14) {
          Alert.alert('No. Handpone tidak bisa kosong','Isi No. Handpone dengan benar.');
        } else { 
          await updateakunTanpafoto(
            namaakun,
            tokoakun,
            phoneakun,
          );
          navigation.goBack();
        };
    } else {
      if (!namaakun) {
        Alert.alert('Nama lengkap masih kosong','Isi nama lengkap anda.');
      } else if (!tokoakun) {
        Alert.alert('Nama toko masih kosong','Isi nama toko anda.');
      } else if (!phoneakun && 9 < phoneakun.length < 14) {
        Alert.alert('No. Handpone tidak bisa kosong','Isi No. Handpone dengan benar.');
      } else {
        await updateakunDenganfoto(
            fotoakun,
            namaakun,
            tokoakun,
            phoneakun,
        );
        navigation.goBack();
      };
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.latar}>
            <View style={styles.atas}>
            { fotoakun ? (
                <Image source={{uri: fotoakun}} style={styles.gambar}/>
                ):(
                <Image source={DefaultFoto} style={styles.gambar}/>
            )}
            <Text style={{color: Putih, fontStyle:'italic', fontSize: 16}}>Gunakan foto terbaik dagangan anda</Text>
            <Text 
            onPress={pickImage}
            style={{color: Ijo, fontWeight: 'bold', textDecorationLine:'underline' ,fontSize: 18}}
            >Ganti Foto </Text>
            </View>
            <View style={{padding:10}}>
                <Text style={styles.judulisi}>Nama Lengkap</Text>
                <TextInput 
                  placeholder="Nama anda tidak bisa kosong"
                  style={styles.input} 
                  value={namaakun}
                  onChangeText={namaakun => setNamaakun(namaakun)}
                />
                <Text style={styles.judulisi}>Nama Toko</Text>
                <TextInput 
                  placeholder="Nama toko tidak bisa kosong"
                  style={styles.input} 
                  value={tokoakun}
                  onChangeText={tokoakun => setTokoakun(tokoakun)}
                />
                <Text style={styles.judulisi}>Waktu Keliling</Text>
                <TextInput 
                  placeholder="Waktu keliling tidak bisa kosong"
                  style={styles.input} 
                  // value={tokoakun}
                  // onChangeText={tokoakun => setTokoakun(tokoakun)}
                />
                <Text style={styles.judulisi}>No.Handphone</Text>
                <TextInput 
                  placeholder="Nomor handphon tidak bisa kosong"
                  style={styles.input} 
                  keyboardType='numeric'
                  value={phoneakun}
                  onChangeText={phoneakun => setPhoneakun(phoneakun)}
                  />
            </View>
            <TouchableOpacity 
              onPress={handleperbaruiakun}
              style={styles.tombol}>
              <Text style={styles.simpan}>Simpan</Text>
            </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default EditScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
    padding: 20,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Putih,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: IjoTua,
    borderWidth: 1,
  },
  atas:{
    alignItems: 'center',
  },
  input:{
    borderBottomWidth: 2,
    borderColor: Ijo,
    marginBottom: 10,
    fontSize: 18,
    color: Putih,
  },
  judulisi:{
    fontSize: 16,
    fontWeight: 'bold',
    color: Putih,
  },
  tombol:{
    backgroundColor: Ijo,
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: width*0.8,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  simpan:{
    color: Putih, 
    fontWeight: 'bold',
    fontSize: 18,
  },
})