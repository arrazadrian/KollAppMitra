import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Minus, Plus } from '../assets/Icons/Index'
import { Ijo, Putih } from '../Utils/Warna'
import { Tomato } from '../assets/Images/Index'
import QuantitySelector from './QuantitySelector'


const JualProduk = ({item}) => {
  const [quantity, setQuantity] = useState(0)
  return (
    <View>
       <View style={styles.container}>
        <View style={{alignItems:'center'}}>
            <Image source={item.image} style={styles.gambar} /> 
        </View>
        <View>
            <Text 
            style={{fontSize:18, fontWeight:'bold'}}
            numberOfLines={1}
            >Rp{item.harga}</Text> 
            <Text
            style={{fontSize:16}}
            numberOfLines={1}
            >{item.nama}</Text> 
            <Text>{item.kuantitas}{item.satuan}</Text> 
        </View>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity}/> 
       </View> 
    </View>
  )
}

export default JualProduk

const styles = StyleSheet.create({
    container: {
        backgroundColor: Putih,
        borderRadius: 10,
        borderColor: Ijo,
        borderWidth: 1,
        padding: 10,
        height: 210,
        width: 100,
        justifyContent:'space-between',
        marginBottom: 10,
        marginLeft: 13,
    },
    gambar: {
        width: 80,
        height: 80,
        borderRadius: 10,
    }
})