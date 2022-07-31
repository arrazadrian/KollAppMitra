import { StyleSheet, Text, TextInput, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react';
import { DefaultFoto } from '../assets/Images/Index';
import { Ijo, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { app } from '../../Firebase/config';
import {  getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';


const EditScreen = () => {

  const [namaakun, setNamaakun] = useState('')
  const [fotoakun, setFotoakun] = useState('')
  const [tokoakun, setTokoakun] = useState('')
  const [phoneakun, setPhoneakun] = useState('')
  const auth = getAuth();
  const db = getFirestore(app)

  useEffect(() => {
    async function getuserEditakun(){
      try {
        let docRef = doc(db, "mitra", auth.currentUser.uid, );
        const docSnap = await getDoc(docRef);
        setNamaakun(docSnap.data().namalengkap);
        setFotoakun(docSnap.data().foto);
        setTokoakun(docSnap.data().namatoko);
        setPhoneakun(docSnap.data().phone);

      } catch (err){
      Alert.alert('There is an error.', err.message)
      }
    }
    getuserEditakun();
  },[])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.latar}>
            <View style={styles.atas}>
            { fotoakun ? (
                <Image source={{uri: {fotoakun}}} style={styles.gambar}/>
                ):(
                <Image source={DefaultFoto} style={styles.gambar}/>
            )}
            <Text style={{color: Putih, fontStyle:'italic', fontSize: 16}}>Gunakan foto terbaik dagangan anda</Text>
            <Text style={{color: Ijo, fontWeight: 'bold', textDecorationLine:'underline' ,fontSize: 18}}>Ganti Foto </Text>
            </View>
            <View style={{padding:10}}>
                <Text style={styles.judulisi}>Nama Lengkap</Text>
                <TextInput style={styles.input} value={namaakun}/>
                <Text style={styles.judulisi}>Nama Toko</Text>
                <TextInput style={styles.input} value={tokoakun}/>
                <Text style={styles.judulisi}>No.Handphone</Text>
                <TextInput style={styles.input} 
                  keyboardType='numeric'
                  value={phoneakun}
                  />
            </View>
            <Pressable style={styles.tombol}>
              <Text style={styles.simpan}>Simpan</Text>
            </Pressable>
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
    fontSize: 20,
    color: Putih,
  },
  judulisi:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Putih,
  },
  tombol:{
    backgroundColor: Ijo,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  simpan:{
    color: Putih, 
    fontWeight: 'bold',
    fontSize: 20,
  },
})