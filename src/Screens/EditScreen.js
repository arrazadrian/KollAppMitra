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

const { width, height } = Dimensions.get('window')

const EditScreen = ({navigation, route}) => {

  const { nama, foto, toko, phone, waktu_buka, waktu_tutup, alamat } = route.params;

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
  const [showBuka, setShowBuka] = useState(false);
  const [buka, setBuka] = useState(waktu_buka);
  const [showTutup, setShowTutup] = useState(false);
  const [tutup, setTutup] = useState(waktu_tutup);

  const untukBuka = ( event, BselectedDate) => {
    const currentDate = BselectedDate;
    setShowBuka(Platform.OS === 'ios');
    setDate(currentDate);

    let btempDate = new Date(currentDate);
    let bjam = btempDate.getHours().toString();
    let bmenit = btempDate.getMinutes().toString();

    if(bjam.length == 1 ){
      bjam = '0' + bjam
    };

    if (bmenit.length == 1){
      bmenit = '0' + bmenit
    };
    
    let bTime = bjam + ':' + bmenit;
    setBuka(bTime);
  };
  
  const untukTutup = ( event, TselectedDate) => {
    const currentDate = TselectedDate;
    setShowTutup(Platform.OS === 'ios');
    setDate(currentDate);

    let ttempDate = new Date(currentDate);
    let tjam = ttempDate.getHours().toString();
    let tmenit = ttempDate.getMinutes().toString();

    if(tjam.length == 1 ){
      tjam = '0' + tjam
    };

    if (tmenit.length == 1 ){
      tmenit = '0' + tmenit
    };

    let tTime = tjam + ':' + tmenit;
    setTutup(tTime);
  };

  const showModeBuka = () => {
      setShowBuka(true);
      console.log("BUKAAAAA")
  };

  const showModeTutup = () => {
      setShowTutup(true);
      console.log("TUTUUPPP")
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
                <Text style={styles.judulisi}>Tempat Mangkal</Text>
                <Text style={[styles.input,{fontSize: 14}]}
                  onPress={() => navigation.navigate('FLocScreen')}
                >
                  {alamat}
                </Text>
                <Text style={styles.judulisi}>Waktu Operasional</Text>
                  <View style={styles.waktu}>
                      <View>
                          <Text style={[styles.input, {fontSize: 26}]}
                            onPress={showModeBuka}
                          >
                            {buka}
                          </Text>
                          { showBuka && (<DateTimePicker
                            testID='123'
                            value={date}
                            mode='time'
                            is24Hour={true}
                            display='default'
                            onChange={untukBuka}
                          />)}
                          <Text style={{color: Putih, fontSize: 12}}>Waktu Buka</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 25, color: Putih}}>-</Text>
                      </View>
                      <View>
                          <Text style={[styles.input, {fontSize: 26}]}
                            onPress={showModeTutup}
                          >
                            {tutup}
                          </Text>
                          { showTutup && (<DateTimePicker
                            testID='890'
                            value={date}
                            mode='time'
                            is24Hour={true}
                            display='default'
                            onChange={untukTutup}
                          />)}
                          <Text style={{color: Putih, fontSize: 12}}>Waktu Tutup</Text>
                      </View>
                  </View>
                  <View style={{marginBottom: 10}}>
                      <Text style={{color: IjoMint, fontStyle:'italic', fontSize: 14, textAlign:'center'}}>
                          Sistem tidak menggunakan waktu operasional untuk menonaktifkan mitra
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
    marginBottom: 15,
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