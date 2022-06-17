import { StyleSheet, Text, View } from 'react-native'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import React from 'react'

const ListReceipt = () => {
  return (
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
  )
}

export default ListReceipt

const styles = StyleSheet.create({
    deskripsi:{
        fontSize: 18,
        color: IjoTua,
    },
    harga:{
        fontSize: 18,
        color: IjoTua,
        fontWeight: 'bold',
    },
})