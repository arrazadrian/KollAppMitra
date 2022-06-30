import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Kosong } from '../assets/Images/Index'
import { IjoTua } from '../Utils/Warna'

const { width, height } = Dimensions.get('window')

const ProdukKosong = () => {
  return (
    <View style={styles.latar}>
      <Image source={Kosong} style={styles.gambar}/>
    </View>
  )
}

export default ProdukKosong

const styles = StyleSheet.create({
    latar:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    gambar:{
        height: height * 0.3,
        width: width * 0.7,
        resizeMode:'contain',
    },
})