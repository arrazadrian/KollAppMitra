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
  keluarKeranjang, 
  masukKeranjang,
  kosongkanKeranjang,
 } from '../features/keranjangSlice'
import { resetPelanggan } from '../features/pelangganSlice';
import { buatTransaksi } from '../../API/firebasemethod'
 
 

const { width, height } = Dimensions.get('window')
 
const CheckoutLangScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const { kodeUID, namapelanggan } = useSelector(state => state.pelanggan);
  const { namamitra } = useSelector(state => state.mitra);

  const selesaiTransaksi =()=> {
    Alert.alert('Apakah transaksi sudah sesuai?','Sebelum menyelesaikan transaksi, pastikan belanjaan sudah sesuai dan pelanggan sudah melunasi belanjaan.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
              
            },
            {
              text: 'Sudah',
              onPress: uploadtransaksiTemuLangsung,
            }
          ]
          )
  }

  function uploadtransaksiTemuLangsung(){
    let jumlah_kuantitas = items.length;
    if (!namapelanggan) {
      Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
    } else if (!namamitra) {
      Alert.alert('Nama mitra kosong','Kamu siapa???.');
    } else if (!items) {
      Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
    } else {
      buatTransaksi(
        namamitra,
        namapelanggan,
        kodeUID,
        kelompokProduk,
        totalhargaKeranjang,
        jumlah_kuantitas,
      );
      navigation.navigate("TQScreen")
      dispatch(kosongkanKeranjang())
      dispatch(resetPelanggan())
    }
  };

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
 
  const totalhargaKeranjang = useSelector(totalHarga)

  const tambahProduk = () => {
    dispatch(masukKeranjang({item}))
  };

  const buangProduk = () => {
    if(!items.length > 0) return;
    
    dispatch(keluarKeranjang({items}))
  }
 
  return (
    <View style={styles.latar}>
      {kodeUID ? (
        <View style={styles.pelanggan}>
          <View style={{width: width * 0.6}}> 
            <Text>Nama Pelanggan</Text>  
            <Text style={styles.nama}>{namapelanggan}</Text>  
          </View>
          <TouchableOpacity style={styles.scan}
            onPress={() => navigation.push('ScanScreen')}
          >
            <Text style={{color:Ijo, fontWeight:'bold'}}>Scan Ulang</Text>
          </TouchableOpacity>
        </View>
      ):(
        <View style={styles.pelanggan}>
          <Text>Scan QR Code pelanggan bila pelanggan membutuhkan struk belanjaan</Text>
          <TouchableOpacity style={styles.scan}
            onPress={() => navigation.push('ScanScreen')}
          >
            <Text style={{color:Ijo, fontWeight:'bold'}}>Scan</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.atas}>
      {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={kelompokProduk}
                //renderItem= {({item}) => <JualProduk item={item} />}
                renderItem= {({items}) => <ProdukKeranjang item={items.item} />}
                keyExtractor={ item => item.item.id}
      /> */}
      {Object.entries(kelompokProduk).map(([key, items]) => (
      <View key={key}>
      <View style={styles.card}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={{uri: items[0]?.image}} style={styles.foto}/>
            <View>
                <Text style={styles.produk} numberOfLines={1}>{items[0]?.namaproduk}</Text>
                <Text style={styles.harga}>Rp{items[0]?.harga}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingRight: 10}}>
            <TouchableOpacity
                style={{
                    height: width * 0.07,
                    width: width * 0.07,
                    borderRadius: 20,
                    backgroundColor: IjoTua,
                    alignItems:'center',
                    justifyContent:'center',
                }}
                onPress={buangProduk}
            >
                <Text style={styles.logoTombol}>-</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20, marginHorizontal: 15}}>{items.length}</Text>
            <TouchableOpacity
                style={{
                    height: width * 0.07,
                    width: width * 0.07,
                    borderRadius: 20,
                    backgroundColor: IjoTua,
                    alignItems:'center',
                    justifyContent:'center',
                }}
                onPress={tambahProduk}
            >
                <Text style={styles.logoTombol}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
      ))}
      </ScrollView>
      <View style={styles.simpulan}>
          <View style={styles.desk}>
            <Text>Subtotal</Text>
            <Text>Rp{totalhargaKeranjang}</Text>
          </View>
          <View style={styles.desk}>
            <Text>Biaya Layanan</Text>
            <Text>Rp1000</Text>
          </View>

          <View style={{borderWidth: 0.5, borderColor: Ijo, marginVertical: 10}}/>
          
          <View style={styles.desk}>
            <View>
              <Text>Harga Total</Text>
              <Text style={styles.harga}>Rp{totalhargaKeranjang + 1000}</Text>
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

export default CheckoutLangScreen

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
      justifyContent:'space-between',
    },
    foto:{
      width: width * 0.15,
      height: width * 0.15,
      borderColor: Ijo,
      borderWidth: 1,
      borderRadius: 10,
      marginRight: 10,
    },
    produk:{
        fontSize: 16,
        width: width * 0.3,
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