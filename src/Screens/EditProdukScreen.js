import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Dimensions, Alert, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import {  DPdefault, Delete } from '../assets/Images/Index.js'
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { hapusproduk, updateprodukTanpafoto, updateprodukDenganfoto } from '../../API/firebasemethod';


const { width, height } = Dimensions.get('window')

const EditProdukScreen = ({ navigation, route }) => {
  
  const { produkid, namaproduk, deskproduk, image, harga, satuan, kuantitas, kategori, tersedia } = route.params;

  const [namaprodukbaru, setNamaprodukbaru] = useState(namaproduk);
  const [deskprodukbaru, setDeskprodukbaru] = useState(deskproduk);
  const [imagebaru, setImagebaru] = useState(image);
  const [hargabaru, setHargabaru] = useState(harga);
  const [kuantitasbaru, setKuantitasbaru] = useState(kuantitas);
  const [satuanbaru, setSatuanbaru] = useState(satuan);
  const [kategoribaru, setKategoribaru] = useState(kategori);
  const [tersediabaru, setTersediabaru] = useState(tersedia);
  
  const [statusproduk, setStatusproduk] = useState();

    //Untuk mendapatkan status produk saat ini,
    useEffect(() => {
      async function getStatusProduk(){
        // console.log(tersediabaru);
        if(tersediabaru == true){
          setStatusproduk("Tersedia")
        } else {
          setStatusproduk("Habis")
        };
      };
      getStatusProduk();
    },[]);

  const imagelama = image;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagebaru(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
    
    return result.assets[0].uri
    
  };

  const handleperbaruiproduk = async () =>{
    if (imagebaru == imagelama){
        if (!namaprodukbaru) {
          Alert.alert('Nama produk masih kosong','Isi nama produk yang sesuai.');
        } else if (!deskprodukbaru) {
          Alert.alert('Deskripsi masih kosong','Isi deskripsi produk yang sesuai.');
        } else if (!hargabaru) {
          Alert.alert('Harga masih kosong','Isi harga produk dengan benar.');
        } else if (!kuantitasbaru) {
          Alert.alert('Kuantitas masih kosong','Isi kuantitas produk dengan benar.');
        }else {
          await updateprodukTanpafoto(
            produkid,
            namaprodukbaru,
            deskprodukbaru,
            hargabaru,
            kuantitasbaru,
            satuanbaru,
            kategoribaru,
            tersediabaru,
          );
          navigation.goBack();
        };
    } else {
      if (!namaprodukbaru) {
        Alert.alert('Nama produk masih kosong','Isi nama produk yang sesuai.');
      } else if (!deskprodukbaru) {
        Alert.alert('Deskripsi masih kosong','Isi deskripsi produk yang sesuai.');
      } else if (!hargabaru) {
        Alert.alert('Harga masih kosong','Isi harga produk dengan benar.');
      } else if (!kuantitasbaru) {
        Alert.alert('Kuantitas masih kosong','Isi kuantitas produk dengan benar.');
      }else {
        await updateprodukDenganfoto(
          produkid,
          namaprodukbaru,
          deskprodukbaru,
          imagebaru,
          hargabaru,
          kuantitasbaru,
          satuanbaru,
          kategoribaru,
          tersediabaru,
        );
        navigation.goBack();
      };
    }
  };

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

  function toggleSwitchTersedia() {
    if(tersediabaru == true){
      setStatusproduk("Habis");
      setTersediabaru(false);
      //console.log(status)
      //console.log(isEnabled)
    } else {
      setStatusproduk("Tersedia");
      setTersediabaru(true);
      //console.log(status)
      //console.log(isEnabled)
    }
    //setTersediabaru(previousState => !previousState)
  }

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
              value={namaprodukbaru}
              onChangeText={namaprodukbaru => setNamaprodukbaru(namaprodukbaru)}
            />
            <Text style={styles.subjudul}>Deskripsi Produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis deskripsi produk dengan jelas"
              multiline={true}
              maxLength={150}
              value={deskprodukbaru}
              onChangeText={deskprodukbaru => setDeskprodukbaru(deskprodukbaru)}
            />
            <Text style={styles.subjudul}>Foto Produk</Text>
            <View style={styles.gantifoto}>
                <Image source={{uri:imagebaru}} style={styles.foto} />
                <View style={{alignItems:'flex-start'}}>
                <Text style={styles.deskripsi} 
                >Foto produk harus sesuai</Text>
                <Text 
                onPress={pickImage}
                style={{
                  fontWeight:'bold', 
                  textDecorationLine:'underline',
                  color:Ijo,
                  fontSize: 18}} 
                >Ganti Foto</Text>
                </View>
            </View>
            <Text style={styles.subjudul}>Harga produk</Text>
            <TextInput style={styles.input}
              placeholder="Tulis harga produk"
              keyboardType='numeric'
              value={hargabaru}
              onChangeText={hargabaru => setHargabaru(hargabaru)}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <View>
                    <Text style={styles.subjudul}>Kuantitas</Text>
                    <TextInput style={styles.input}
                      placeholder="Banyaknya produk"
                      keyboardType='numeric'
                      value={kuantitasbaru}
                      onChangeText={kuantitasbaru => setKuantitasbaru(kuantitasbaru)}
                    />
              </View>
              <View>
                    <Text style={styles.subjudul}>Satuan</Text>
                    <Picker
                      mode='dropdown'
                      style={{backgroundColor: Putih, width: 140}}
                      selectedValue={satuanbaru}
                      onValueChange={(itemValue, itemIndex) =>
                        setSatuanbaru(itemValue)
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
              style={{backgroundColor: Putih, marginBottom: 10}}
              selectedValue={kategoribaru}
              onValueChange={(itemValue, itemIndex) =>
                setKategoribaru(itemValue)
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
            <View style={styles.kesediaan}>
                <Text style={styles.subjudul}>
                  Status Produk:
                  { tersediabaru == true ? 
                    (
                      <Text style={{color: Ijo}}> {statusproduk}</Text>
                      ):(
                      <Text style={{color: 'tomato'}}> {statusproduk}</Text>
                    )
                  } 
                </Text>
                <Switch
                  trackColor={{ false: '#767577', true: Ijo }}
                  thumbColor={tersediabaru ? '#f5dd4b' : '#f4f3f4'  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitchTersedia}
                  value={tersediabaru}
                />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical: 20}}>
                <View style={styles.hapus}>
                    <Text style={{color:Ijo, fontSize: 16, fontWeight:'bold'}}
                     onPress={handleDelete}
                    >Hapus Produk</Text>
                </View>
                <TouchableOpacity style={styles.tombol}
                onPress={handleperbaruiproduk}
                >
                  <Text
                  style={{
                    color: Putih,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                  >Perbarui Produk</Text>
                </TouchableOpacity>
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
    kesediaan:{
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center',
      backgroundColor: Putih,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: Ijo,
      borderWidth: 1,
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