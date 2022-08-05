import { StyleSheet, Text, ScrollView, View, Pressable, Alert, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { IjoTua, Kuning, Putih, Ijo, IjoMint } from '../Utils/Warna'
import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'
import ProdukKeranjang from '../Components/ProdukKeranjang'

const { width, height } = Dimensions.get('window')

const CheckoutLangScreen = ({item}) => {

  const navigation = useNavigation();

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

  return (
    <View style={styles.latar}>
      <View style={styles.atas}>
        <ProdukKeranjang/>
        <ProdukKeranjang/>
        <ProdukKeranjang/>
        <ProdukKeranjang/>
      </View>
      <View style={styles.simpulan}>
          <View style={styles.desk}>
            <Text>Subtotal</Text>
            <Text>Rp21000</Text>
          </View>
          <View style={styles.desk}>
            <Text>Biaya Layanan</Text>
            <Text>Rp4000</Text>
          </View>

          <View style={{borderWidth: 0.5, borderColor: Ijo, marginVertical: 10}}/>
          
          <View style={styles.desk}>
            <View>
              <Text>Harga Total</Text>
              <Text style={styles.harga}>Rp25000</Text>
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