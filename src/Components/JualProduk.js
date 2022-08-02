import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import QuantitySelector from './QuantitySelector'
import { useNavigation } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')

const JualProduk = ({item}) => {

  const navigation = useNavigation();
  
  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
    })
  }

  const [quantity, setQuantity] = useState(0)
  return (
    <View>
       <View style={styles.container}>
        <Pressable onPress={pindahDetail}>
            <Image source={{uri: item.image}} style={styles.gambar}/> 
        </Pressable>
        <View>
            <Text 
            style={{fontSize:18, fontWeight:'bold'}}
            numberOfLines={1}
            >Rp{item.harga}</Text> 
            <Text
            style={{fontSize:16}}
            numberOfLines={1}
            >{item.namaproduk}</Text> 
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