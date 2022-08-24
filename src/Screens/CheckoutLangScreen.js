import { StyleSheet, Text, ScrollView, View, Pressable, Alert, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IjoTua, Kuning, Putih, Ijo, IjoMint } from '../Utils/Warna'
import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'
import ProdukKeranjang from '../Components/ProdukKeranjang'
import { useDispatch, useSelector } from 'react-redux'
import { pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice'

const { width, height } = Dimensions.get('window')

const CheckoutLangScreen = () => {

  const navigation = useNavigation();
  const items = useSelector(pilihProdukKeranjang)
  const dispatch = useDispatch();
  const [kelompokProduk, setKelompokProduk] = useState([]);

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

  return (
    <View style={styles.latar}>
      <View style={styles.atas}>
      <FlatList
                showsVerticalScrollIndicator={false}
                data={kelompokProduk}
                //renderItem= {({item}) => <JualProduk item={item} />}
                renderItem= {({items}) => <ProdukKeranjang item={items.item} />}
                keyExtractor={ item => item.item.id}
      />
      </View>
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
    atas:{
      paddingHorizontal:10
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
    }
})