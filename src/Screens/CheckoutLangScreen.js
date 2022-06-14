import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native'
import React from 'react'
import { IjoTua, Kuning, Putih, Ijo } from '../Utils/Warna'

const CheckoutLangScreen = () => {
  return (
    <ScrollView style={styles.latar}>
      <Text style={styles.judul}>QR Code Trsansaksi</Text>
      <Text style={styles.deskripsi}>Tunjukan QR Code ini kepada pelanggan bila sudah melunaskan transaksi.</Text>
      <View style={styles.qrcode}>

      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text>ID: 28138732893717</Text>
        <Text>12/02/2022, 08.02</Text>
      </View>
      <Text style={styles.judul}>Jenis Layanan</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>Temu Langsung</Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>0</Text>
        </Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>Jasa Aplikasi</Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>1000</Text>
        </Text>
      </View>
      <Text style={styles.judul}>Deskripsi Pesanan</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.deskripsi}>
            <Text>2x         </Text>
            <Text>Ikan Mujair</Text>
        </Text>
        <Text style={styles.harga}>
            <Text>Rp</Text>
            <Text>24000</Text>
        </Text>
      </View>
      <View style={styles.total}>
            <Text style={styles.judul}>Total Harga:</Text>
            <Text style={styles.judul}>
                <Text>Rp</Text>
                <Text>26000</Text>
            </Text>
      </View>
      <Pressable style={styles.pesan}>
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
    judul:{
        fontSize: 20,
        fontWeight: 'bold',
        color: IjoTua,
    }, 
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
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
      borderTopWidth: 3,
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

})