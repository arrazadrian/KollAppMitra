import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'

const ProsesCard = () => {
  return (
    <Pressable style={styles.card}>
      <Image source={DPkartu} style={styles.foto} />
      <View>
        <Text
        style={{fontSize:20, fontWeight:'bold', color:IjoTua}}
        >
            Sayur Aa Anri
        </Text>
        <Text
        style={{fontSize:18, fontWeight:'bold', color:Ijo}}
        >
            Sedang menuju lokasi
        </Text>
        <Text
        style={{fontSize:18, fontWeight:'bold', color:Ijo}}
        >
            Jl. Merderka Selatan no.19
        </Text>
      </View>
    </Pressable>
  )
}

export default ProsesCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
    foto:{
        width: 100,
        height: 100,
        borderRadius: 20,
        margin: 10,
    }
})