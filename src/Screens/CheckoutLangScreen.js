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
  masukKeranjang
 } from '../features/keranjangSlice'


const { width, height } = Dimensions.get('window')
 
const CheckoutLangScreen = ({route}) => {

  const navigation = useNavigation();
  const items = useSelector(pilihProdukKeranjang)
  const dispatch = useDispatch();
  const [kelompokProduk, setKelompokProduk] = useState([]);
  const [pelanggan, setPelanggan] = useState();

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
              onPress: () => {
                navigation.navigate('TQScreen')
              }
            }
          ]
          )
  }

  useEffect(() => {
    const kelompok = items.reduce((results, item) => {
      (results[item.item.id] = results[item.item.id] || []).push(item.item);
      return results;
    }, {});

    setKelompokProduk(kelompok);
  }, [items]);

  console.log(kelompokProduk);

  const totalhargaKeranjang = useSelector(totalHarga)

  const tambahProduk = () => {
    dispatch(masukKeranjang({item}))
  };

  const buangProduk = () => {
    if(!items.length > 0) return;
    
    dispatch(keluarKeranjang({items}))
  }

  useEffect(() => {
    if (route.params?.pelanggan) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setPelanggan(route.params?.pelanggan)
      console.log(route.params?.pelanggan)
    } else {
      console.log('Ga masuk gan')
    }
  }, [route.params?.pelanggan]);

  

  return (
    <View style={styles.latar}>
      {pelanggan?(
        <View>
          <Text>Nama Pelanggan:{pelanggan}</Text>  
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
            <TouchableOpacity style={styles.tombol}>
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
    scan:{
      backgroundColor: IjoMint,
      borderRadius: 5,
      alignItems:'center',
      justifyContent:'center',
      padding: 10,
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