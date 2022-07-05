import { StyleSheet, Text, ScrollView, View, Pressable, Alert } from 'react-native'
import React from 'react'
import { IjoTua, Kuning, Putih, Ijo } from '../Utils/Warna'
import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'

const CheckoutLangScreen = () => {

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
                navigation.navigate('HomeScreen')
              }
            }
          ]
          )
  }

  return (
    <ScrollView style={styles.latar}>
      <View style={styles.kertas}>
          <Text style={styles.judulbesar}>DETAIL PEMESANAN</Text>
          <View style={styles.perbagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.deskripsi}>Nama Pelanggan</Text>
                <Text style={styles.deskripsi}>Andrea Subaesi</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.deskripsi}>ID Pelanggan</Text>
                <Text style={styles.deskripsi}>216178261862</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.deskripsi}>ID Pemensanan</Text>
                <Text style={styles.deskripsi}>28138732893717</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.deskripsi}>Waktu Pemenansan</Text>
                <Text style={styles.deskripsi}>12/02/2022, 08.02</Text>
              </View>
          </View>
          <View style={styles.perbagian}>
              <Text style={styles.judul}>Jenis Layanan</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.deskripsi}>Temu Langsung</Text>
                <Text style={styles.harga}>
                    <Text>Rp</Text>
                    <Text>0</Text>
                </Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                <Text style={styles.deskripsi}>Jasa Aplikasi</Text>
                <Text style={styles.harga}>
                    <Text>Rp</Text>
                    <Text>1000</Text>
                </Text>
              </View>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={styles.judul}>Deskripsi Pesanan</Text>
              <Text 
              onPress={() => navigation.navigate('LangsungScreen')}
              style={styles.ubah}>Ubah</Text>
              </View>
              <ListReceipt/>
          </View>
          <View style={styles.total}>
                <Text style={styles.judul}>Total Harga:</Text>
                <Text style={styles.judul}>
                    <Text>Rp</Text>
                    <Text>25000</Text>
                </Text>
          </View>
      </View>
      <Pressable style={styles.pesan}
      onPress = {selesaiTransaksi}
      >
          <Text style={{color:Ijo, fontSize:20, fontWeight:'bold', textAlign:'center'}}>Selesai Transaksi</Text>
      </Pressable>
    </ScrollView>
  )
}

export default CheckoutLangScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
        padding: 10,
    },
    kertas:{
      backgroundColor: Putih,
      padding: 10,
      borderRadius: 10,
    },
    judulbesar:{
        fontSize: 22,
        fontWeight: 'bold',
        color: IjoTua,
        textAlign:'center',
        marginBottom: 10,
    }, 
    judul:{
        fontSize: 20,
        fontWeight: 'bold',
        color: IjoTua,
    }, 
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
    },
    ubah:{
        color: Ijo,
        fontSize: 18,
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    qrcode:{
        backgroundColor: Putih,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        height: 200,
        width: 200,
        alignSelf: 'center',
    },
    total:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop: 10,
      borderTopColor: IjoTua,
      borderTopWidth: 1,
    },
    pesan:{
        marginVertical: 20,
        borderWidth: 3,
        borderColor: Ijo,
        borderRadius: 20,
        padding: 10,
    },
    harga:{
      fontSize: 18,
      color: IjoTua,
      fontWeight: 'bold',
    },
    judul:{
      fontSize: 20,
      color: IjoTua,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    deskripsi:{
        fontSize: 18,
        color: IjoTua,
    },
    perbagian:{
      marginBottom: 10,
      padding: 10,
      borderColor: Ijo,
      borderWidth:1,
      borderRadius: 10,
    }

})