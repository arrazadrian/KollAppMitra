import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Minus, Plus } from '../assets/Icons/Index'
import { Ijo, Putih } from '../Utils/Warna'
import { Tomato } from '../assets/Images/Index'
import QuantitySelector from './QuantitySelector'

const { width, height } = Dimensions.get('window')

const JualProduk = ({item}) => {
  const [quantity, setQuantity] = useState(0)
  return (
    <View>
       <View style={styles.container}>
        <View>
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
            <Text>{item.kuantitas} {item.satuan}</Text> 
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
        height: height * 0.3,
        //width: width * 0.3,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    gambar: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    }
})