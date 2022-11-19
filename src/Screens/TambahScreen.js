import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import {  DPdefault } from '../assets/Images/Index.js'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { uploadProdukUtama } from '../../API/firebasemethod';

const TambahScreen = ({navigation}) => {

  const [namaproduk, setNamaproduk] = useState('');
  const [deskproduk, setDeskproduk] = useState('');
  const [image, setImage] = useState();
  const [harga, setHarga] = useState('');
  const [kuantitas, setKuantitas] = useState('');
  const [satuan, setSatuan] = useState('g');
  const [kategori, setKategori] = useState('Sayuran');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
    
    return result.assets[0].uri
    
  };

  const emptyState = () => {
    setNamaproduk('');
    setDeskproduk('');
    setImage();
    setHarga('');
    setKuantitas('');
    setSatuan('g');
    setKategori('Sayuran');
  };

  const handleTambahProdukUtama = async () =>{
    if (!namaproduk) {
      Alert.alert('Nama produk masih kosong','Isi nama produk yang sesuai.');
    } else if (!deskproduk) {
      Alert.alert('Deskripsi masih kosong','Isi deskripsi produk yang sesuai.');
    } else if (!image) {
      Alert.alert('Foto belum dipilih','Pilih foto produk yang jelas.');
    } else if (!harga) {
      Alert.alert('Harga masih kosong','Isi harga produk dengan benar.');
    } else if (!kuantitas) {
      Alert.alert('Kuantitas masih kosong','Isi kuantitas produk dengan benar.');
    }else {
      await uploadProdukUtama(
        namaproduk,
        deskproduk,
        image,
        harga,
        kuantitas,
        satuan,
        kategori,
      );
      await emptyState();
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.latar}>
          <View style={styles.container}>
            <View style={{marginBottom: 10, paddingTop: 10,}}>
              <Text style={styles.judul}>Produk Utama Baru</Text>
              <Text style={styles.deskripsi}>Beri detail produk sebaik mungkin</Text>
            </View>
            <Text style={styles.subjudul}>Foto Produk</Text>
            <View style={styles.gantifoto}>
              {image != null ? (
                <Image 
                source={{uri: image}} 
                style={styles.foto} />
              ):(
                <Image 
                source={DPdefault} 
                style={styles.fotodefault} />
              )} 
                <View>
                    <Text style={styles.deskripsi} 
                    >Foto produk harus jelas</Text>
                    <Text 
                      onPress={pickImage}
                      style={{
                      fontWeight:'bold', 
                      textDecorationLine:'underline',
                      color:Ijo,
                      fontSize: 18}} 
                    >Pilih Foto</Text>
                </View>
            </View>
            <Text style={styles.subjudul}>Nama Produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis nama produk"
              value={namaproduk}
              onChangeText={namaproduk => setNamaproduk(namaproduk)}
            />
            <Text style={styles.subjudul}>Deskripsi Produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis deskripsi produk dengan jelas"
              value={deskproduk}
              onChangeText={deskproduk => setDeskproduk(deskproduk)}
              multiline={true}
              maxLength={150}
            />
            <Text style={styles.subjudul}>Harga produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis harga produk"
              keyboardType='numeric'
              value={harga}
              onChangeText={harga => setHarga(harga)}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                    <Text style={styles.subjudul}>Kuantitas</Text>
                    <TextInput style={styles.input}
                      placeholder="Banyaknya produk"
                      keyboardType='numeric'
                      value={kuantitas}
                      onChangeText={kuantitas => setKuantitas(kuantitas)}
                    />
              </View>
              <View>
                    <Text style={styles.subjudul}>Satuan</Text>
                    <Picker
                      mode='dropdown'
                      style={{backgroundColor: Putih, width: 140}}
                      selectedValue={satuan}
                      onValueChange={(itemValue, itemIndex) =>
                      setSatuan(itemValue)
                      }>
                      <Picker.Item label="gram" value="g"  />
                      <Picker.Item label="kilogram" value="kg" />
                      <Picker.Item label="ons" value="ons" />
                      <Picker.Item label="ikat" value="ikat" />
                      <Picker.Item label="lembar" value="lembar" />
                      <Picker.Item label="bungkus" value="bungkus" />
                      <Picker.Item label="buah" value="buah" />
                      <Picker.Item label="liter" value="liter" />
                    </Picker>
              </View>
            </View>
            <Text style={styles.subjudul}>Kategori Produk</Text>
            <Picker
              mode='dropdown'
              style={{backgroundColor: Putih}}
              selectedValue={kategori}
              onValueChange={(itemValue, itemIndex) =>
              setKategori(itemValue)
              }>
              <Picker.Item label="Sayuran" value="Sayuran" />
              <Picker.Item label="Produk Laut" value="Produk Laut" />
              <Picker.Item label="Daging" value="Daging" />
              <Picker.Item label="Buah" value="Buah" />
              <Picker.Item label="Bahan Pokok" value="Bahan Pokok" />
              <Picker.Item label="Cemilan" value="Cemilan" />
              <Picker.Item label="Lauk" value="Lauk" />
              <Picker.Item label="Bumbu" value="Bumbu" />
              <Picker.Item label="Frozen Food" value="Frozen Food" />
            </Picker>
            <TouchableOpacity style={styles.tombol}
              onPress={handleTambahProdukUtama}>
              <Text
              style={{
                color: Ijo,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              >Tambahkan Produk Utama</Text>
            </TouchableOpacity>
          </View> 
    </ScrollView>
  )
}

export default TambahScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        padding: 10,
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: IjoMint,
        borderRadius: 20,
        marginBottom: 20,
    },
    judul:{
        fontSize: 20,
        fontWeight: 'bold',
        color: IjoTua,
        textAlign: 'center',
    },
    subjudul:{
        fontSize: 18,
        fontWeight: 'bold',
        color: IjoTua,
        marginBottom: 8,
    },
    deskripsi:{
        fontSize: 17,
        color: IjoTua,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    foto:{
        backgroundColor: Putih,
        borderRadius: 20,
        height: 100,
        width: 100,
        marginRight: 10,
    },
    fotodefault:{
        backgroundColor: Putih,
        borderRadius: 10,
        height: 50,
        width: 50,
        marginRight: 10,
    },
    gantifoto:{
      marginBottom: 10, 
      flexDirection:'row',
      alignItems: 'center',
    },
    input:{
      backgroundColor: Putih,
      fontSize: 16,
      padding: 10,
      marginBottom: 10,
    },
    tombol:{
        borderColor: Ijo,
        borderWidth: 3,
        borderRadius: 20,
        padding: 10,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf: 'center',   
        marginTop: 10,
        marginBottom: 20,
    }
})