import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Minus, Plus } from '../assets/Icons/Index'
import { Ijo, Putih } from '../Utils/Warna'
import { Tomato } from '../assets/Images/Index'
import QuantitySelector from './QuantitySelector'


const JualProduk = ({item}) => {
 // const [quantity, setQuantity] = useState(0)
  return (
    <View>
       <View style={styles.container}>
        <View style={{alignItems:'center'}}>
            <Image source={item.image} style={styles.gambar} /> 
        </View>
        <View style={{paddingHorizontal: 5}}>
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
         {/* <QuantitySelector quantity={quantity} setQuantity={setQuantity}/> */}
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
        width: 120,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    gambar: {
        width: 95,
        height: 95,
        borderRadius: 10,
    }
})