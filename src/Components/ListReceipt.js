import { StyleSheet, Text, View } from 'react-native'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import React from 'react'

const ListReceipt = ({item}) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    <Text style={styles.deskripsi}>
        <Text>{item.jumlah}x         </Text>
        <Text>{item.namaproduk}</Text>
    </Text>
    <Text style={styles.harga}>
        <Text>Rp</Text>
        <Text>{item.harga}</Text>
    </Text>
  </View>
  ) 
}

export default ListReceipt

const styles = StyleSheet.create({
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
    },
    harga:{
        fontSize: 16,
        color: IjoTua,
        fontWeight: 'bold',
    },
})