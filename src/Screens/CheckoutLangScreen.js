import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import { IjoTua, Kuning, Putih } from '../Utils/Warna'

const CheckoutLangScreen = () => {
  return (
    <ScrollView style={styles.latar}>
      <Text style={styles.judul}>QR Code Trsansaksi</Text>
      <Text style={styles.deskripsi}>Tunjukan QR Code ini kepada pelanggan.</Text>
      <View style={styles.qrcode}>

      </View>
      <Text></Text>
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
})