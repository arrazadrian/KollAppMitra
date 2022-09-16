import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Alert, Button, ScrollView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react';
import { DefaultFoto } from '../assets/Images/Index';
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { updateakunTanpafoto, updateakunDenganfoto } from '../../API/firebasemethod';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

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

  const [date, setDate] = useState(new Date);
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [buka, setBuka] = useState("00:00");
  const [tutup, setTutup] = useState("00:00");

  const untukBuka = ( ubah, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = ubah;
    let bTime = tempDate.getHours() + ':' + tempDate.getMinutes()
    setBuka(bTime)
  };
  
  const untukTutup = ( ubah, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = ubah;
    let tTime = tempDate.getHours()  + ':' + tempDate.getMinutes()
    setTutup(tTime)
  };

  const showMode = () => {
      setShow(true);
      setMode('time');
  };


  return (
    <View style={styles.latar}>
      <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.atas}>
            { fotoakun ? (
                <Image source={{uri: fotoakun}} style={styles.gambar}/>
                ):(
                <Image source={DefaultFoto} style={styles.gambar}/>
            )}
            <Text style={{color: Putih, fontStyle:'italic', fontSize: 16}}>Gunakan foto terbaik dagangan anda</Text>
            <Text 
            onPress={pickImage}
            style={styles.ubah}
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
                <Text style={styles.judulisi}>Waktu Operasional</Text>
                  <View style={styles.waktu}>
                      <View>
                          <Text style={[styles.input, {fontSize: 20}]}>{buka}</Text>
                          { show && (<DateTimePicker
                            testID='bukakapan'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={(ubah) => untukBuka(ubah)}
                          />)}
                          <Text style={{color: Putih, fontSize: 16}}>Waktu Buka</Text>
                          <Text style={styles.ubah}
                             onPress={showMode}
                          >Ubah</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 25, color: Putih}}>-</Text>
                      </View>
                      <View>
                          <Text style={[styles.input, {fontSize: 20}]}>{tutup}</Text>
                          { show && (<DateTimePicker
                            testID='tutupkapan'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={(ubah)=>untukTutup(ubah)}
                          />)}
                          <Text style={{color: Putih, fontSize: 16}}>Waktu Tutup</Text>
                          <Text style={styles.ubah}
                            onPress={showMode}
                          >Ubah </Text>
                      </View>
                  </View>
                  <View style={{marginBottom: 10}}>
                      <Text style={{color: IjoMint, fontStyle:'italic', fontSize: 14, textAlign:'center'}}>
                          Waktu operasional hanya digunakan sebagai informasi untuk pelanggan
                      </Text>
                  </View>
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
      </ScrollView>
    </View>
  )
}

export default EditScreen

const styles = StyleSheet.create({
  latar:{
    flex:1,
    backgroundColor: IjoTua,
    paddingHorizontal: 20,
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
    paddingTop: 20,
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
  ubah:{
    color: Ijo, 
    fontWeight: 'bold', 
    textDecorationLine:'underline',
    fontSize: 18,
  },
  waktu:{
    borderRadius: 10,
    borderEndWidth: 1,
    borderStartWidth: 1,
    borderColor: Ijo,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
    padding: 10,
    marginVertical: 10,
  },
  tombol:{
    backgroundColor: IjoMint,
    paddingVertical: 8,
    width: width*0.8,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  simpan:{
    color: Ijo, 
    fontWeight: 'bold',
    fontSize: 18,
  },
})