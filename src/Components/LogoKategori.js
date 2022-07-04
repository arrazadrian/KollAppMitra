import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'

const { width, height } = Dimensions.get('window')

const LogoKategori = ({item}) => {
    const [kategori, setKategori]= useState('Semua Produk')
    const saringKategori = kategori =>{
      setKategori(kategori)
    }


  return (
    <Pressable 
        onPress={() => saringKategori(item.nama)}
        style={styles.kartu}
        >
        <View style={[styles.belakang, kategori === item.nama && styles.belakangAktif ]}>
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
        marginRight: 10,
        marginBottom: 10,
    },
    nama:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: IjoTua,
    },
    gambar:{
        width: width*0.15,
        height: width*0.15,
      },
    belakang:{
      alignItems:'center',
      padding: 5, 
      backgroundColor: Putih, 
      borderRadius: 50, 
      marginBottom: 5,
      borderWidth: 1,
      borderColor: Ijo,
    },
    belakangAktif:{
      backgroundColor: IjoMint, 
    },
})