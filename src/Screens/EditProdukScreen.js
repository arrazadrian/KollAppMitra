import { StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import {  DPdefault, Delete } from '../assets/Images/Index.js'
import {Picker} from '@react-native-picker/picker';
import { hapusproduk } from '../../API/firebasemethod';
import { async } from '@firebase/util';

const { width, height } = Dimensions.get('window')

const EditProdukScreen = ({ navigation, route }) => {
  
  const { produkid, namaproduk, deskproduk, image, harga, satuan, kuantitas, kategori } = route.params;
  
  const handleDelete = async () => {
    Alert.alert(
      'Anda ingin hapus produk in?',
      'Data produk akan dihapus permanen.',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Tidak dipilih'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          // onPress: () => console.log(produkid),
          onPress: () => {
            hapusproduk(produkid);
            navigation.goBack();
          },
        },
      ],

    );
  };

  return (
<ScrollView style={styles.latar}>
          <View style={styles.container}>
            <View style={{marginBottom: 10, paddingTop: 10,}}>
              <Text style={styles.judul}>Perbaiki Data Produk</Text>
              <Text style={styles.deskripsi}>Perbarui data produk dengan sesuai</Text>
            </View>
            <Text style={styles.subjudul}>Nama Produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis nama produk"
              value={namaproduk}
            />
            <Text style={styles.subjudul}>Deskripsi Produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis deskripsi produk dengan jelas"
              multiline={true}
              maxLength={100}
              value={deskproduk}
            />
            <Text style={styles.subjudul}>Foto Produk</Text>
            <View style={styles.gantifoto}>
                <Image source={{uri:image}} style={styles.foto} />
                <View style={{alignItems:'flex-start'}}>
                <Text style={styles.deskripsi} 
                >Foto produk harus sesuai</Text>
                <Text 
                style={{
                  fontWeight:'bold', 
                  textDecorationLine:'underline',
                  color:Ijo,
                  fontSize: 18,}} 
                >Ganti Foto</Text>
                </View>
            </View>
            <Text style={styles.subjudul}>Harga produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis harga produk"
              keyboardType='numeric'
              value={harga}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                    <Text style={styles.subjudul}>Kuantitas</Text>
                    <TextInput style={styles.input}
                      placeholder="Banyaknya produk"
                      keyboardType='numeric'
                      value={kuantitas}
                    />
              </View>
              <View>
                    <Text style={styles.subjudul}>Satuan</Text>
                    <Picker
                      mode='dropdown'
                      style={{backgroundColor: Putih, width: 140}}
                      selectedValue={satuan}
                      onValueChange={(itemValue, itemIndex) =>
                        setPilsatuan(itemValue)
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
                setPilkategori(itemValue)
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
            <View style={{flexDirection:'row', alignItems:'center', marginVertical: 20}}>
                <View style={styles.hapus}>
                    <Text style={{color:Ijo, fontSize: 16, fontWeight:'bold'}}
                     onPress={handleDelete}
                    >Hapus Produk</Text>
                </View>
                <Pressable style={styles.tombol}>
                  <Text
                  style={{
                    color: Putih,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                  >Perbarui Produk</Text>
                </Pressable>
            </View>
          </View> 
    </ScrollView>
  )
}

export default EditProdukScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: IjoMint,
        flex: 1,
        padding: 10,
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: Kuning,
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
        height: width*0.25,
        width: width*0.25,
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
    hapus:{
      flex: 1,
      padding: 10,
      width: 170,
      height: 50,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center',
    },
    tombol:{
        flex: 1,
        backgroundColor: Ijo,
        borderRadius: 10,
        padding: 10,
        width: '50%',
        alignItems: 'center', 
        justifyContent: 'center',
    },
})