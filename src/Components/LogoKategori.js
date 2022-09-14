import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'

const { width, height } = Dimensions.get('window')

const LogoKategori = ({item}) => {
  const [kategori, setKategori]= useState(1)

  return (
    <Pressable 
        onPress={() => setKategori(item.id)}
        style={styles.kartu}
        >
        <View style={{
            backgroundColor: kategori === item.id ? IjoMint : Putih, 
            ...styles.kategoripilihan,
        }}>
            <Image source={item.image} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>{item.nama}</Text>
    </Pressable>
  )
}

export default LogoKategori

const styles = StyleSheet.create({
    kartu:{
        width: width*0.20,
        height: width*0.3,
        alignSelf:'center',
        marginRight: 15,
        marginBottom: 10,
    },
    nama:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: IjoTua,
    },
    gambar:{
        width: width*0.15,
        height: width*0.15,
      },
    kategoripilihan:{
        alignItems:'center',
        padding: 5, 
        borderRadius: 50, 
        marginBottom: 5,
        borderWidth: 1,
        borderColor: Ijo,
    }
})