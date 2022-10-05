import { StyleSheet, Text, ScrollView, Image, View, Pressable, Alert, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IjoTua, Kuning, Putih, Ijo, IjoMint } from '../Utils/Warna'
//import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'
//import ProdukKeranjang from '../Components/ProdukKeranjang'
import { useDispatch, useSelector } from 'react-redux'
import { 
  pilihProdukKeranjang, 
  totalHarga, 
  kosongkanKeranjang,
 } from '../features/keranjangSlice'
 

const { width, height } = Dimensions.get('window')
 
const CheckoutPMScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const selesaiTransaksi =()=> {
    Alert.alert('Apakah transaksi sudah sesuai?','Sebelum menyelesaikan transaksi, pastikan belanjaan sudah sesuai dan pelanggan sudah melunasi belanjaan.',
          [
            {
              text: 'Tutup',
              onPress: () => {
                console.log('Tutup dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: () => {
                console.log('Sudah dipencet')
              }
              //onPress: uploadtransaksiTemuLangsung,
            }
          ]
          )
  }

//   async function uploadtransaksiTemuLangsung(){
//     try{
//       let jumlah_kuantitas = items.length;
//       if (!namapelanggan) {
//         Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
//       } else if (!namamitra) {
//         Alert.alert('Nama mitra kosong','Silahkan tutup dan buka kembali aplikasi ini.');
//       } else if (!namatoko) {
//         Alert.alert('Nama toko kosong','Silahkan tutup dan buka kembali aplikasi ini.');
//       } else if (!items) {
//         Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
//       } else {
//         buatTransaksiTL(
//           namamitra,
//           namatoko,
//           namapelanggan,
//           kodeUID,
//           kelompokProduk,
//           subtotalhargaKeranjang,
//           hargalayanan,
//           hargatotalsemua,
//           jumlah_kuantitas,
//         );
//         dispatch(kosongkanKeranjang());
//         navigation.navigate("TQScreen");
//       }
//     } catch (err){
//       Alert.alert('Ada error buat transaksi temu langsung!', err.message);
//     }  
//   };

  useEffect(() => {
    const kelompok = items.reduce((results, item) => {
      (results[item.item.id] = results[item.item.id] || []).push(item.item);
      return results;
    }, {});

    const jikakosong = () => {
      if(!items.length){
        navigation.goBack();
      }
    };
    
    setKelompokProduk(kelompok);
    jikakosong();

  }, [items]);

  //console.log(kelompokProduk);
  // console.log(kodeUID);
  // console.log(namapelanggan);
 
  const subtotalhargaKeranjang = useSelector(totalHarga)
  const hargalayanan =  5000
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan
 
  return (
    <View style={styles.latar}>
      <ScrollView style={styles.atas}>
            {Object.entries(kelompokProduk).map(([key, items]) => (
            <View key={key}>
            <View style={styles.card}>
              <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingHorizontal: 5}}>
                  <Text style={{fontSize: 16}}>{items.length} x</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={{uri: items[0]?.image}} style={styles.foto}/>
                  <View>
                      <Text style={styles.produk} numberOfLines={1}>{items[0]?.namaproduk}</Text>
                      <Text>Rp{items[0]?.harga}</Text>
                  </View>
              </View>
              <View style={{justifyContent:'center'}}>
                  <Text style={styles.harga}>
                    Rp{items.length * items[0]?.harga}
                  </Text>
              </View>
          </View>
          </View>
            ))}
      </ScrollView>
      <View style={styles.simpulan}>
          <View style={styles.desk}>
            <Text>Subtotal</Text>
            <Text>Rp{subtotalhargaKeranjang}</Text>
          </View>
          <View style={styles.desk}>
            <Text>Biaya Layanan</Text>
            <Text>{hargalayanan}</Text>
          </View>

          <View style={{borderWidth: 0.5, borderColor: Ijo, marginVertical: 10}}/>
          
          <View style={styles.desk}>
            <View>
              <Text>Harga Total</Text>
              <Text style={styles.harga}>Rp{hargatotalsemua}</Text>
            </View>
            <TouchableOpacity style={styles.tombol}
              onPress={selesaiTransaksi}
            >
              <Text style={{color:Putih, fontWeight:'bold'}}>Selesaikan Pesanan</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default CheckoutPMScreen

const styles = StyleSheet.create({
    latar:{
      backgroundColor: Kuning,
      flex: 1,
    },
    pelanggan:{
      backgroundColor: Putih,
      marginBottom: 5,
      padding: 10,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    nama:{
      color: IjoTua,
      fontSize: 18,
      fontWeight: 'bold',
    },
    scan:{
      alignItems:'center',
      justifyContent:'center',
      paddingVertical: 2,
    },
    atas:{
      paddingHorizontal:10
    },
    card:{
      backgroundColor: Putih,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 10,
      marginVertical: 4,
    },
    foto:{
      width: width * 0.15,
      height: width * 0.15,
      borderColor: Ijo,
      borderWidth: 1,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    produk:{
        fontSize: 16,
        width: width * 0.36,
    },
    harga:{
        fontSize: 18,
        fontWeight:'bold',
    },
    logoTombol:{
        color: Putih,
        fontWeight: 'bold',
        fontSize: 16,
    },
    simpulan:{
      position:'absolute',
      padding: 20,
      backgroundColor: IjoMint,
      width: width,
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    desk:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    harga:{
      fontSize: 18,
      fontWeight:'bold',
    },
    tombol:{
      borderRadius: 10,
      padding: 10,
      backgroundColor: Ijo,
    },
})