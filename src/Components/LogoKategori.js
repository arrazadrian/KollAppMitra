import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const LogoKategori = ({item}) => {

    const navigation = useNavigation();

    const pindahKategori = () => {
      navigation.navigate('KategoriScreen', { 
        id: item.id,
        nama: item.nama,
        image: item.image,
      })
    }

  return (
    <Pressable 
    onPress={pindahKategori}
    style={styles.kartu}
    >
        <View style={styles.belakang}>
            <Image source={item.image} style={styles.gambar} />
        </View>
        <Text style={styles.nama}>{item.nama}</Text>
    </Pressable>
  )
}

export default LogoKategori

const styles = StyleSheet.create({
    kartu:{
        width: '33%',
        height: '33%',
        alignItems: 'center',
        marginBottom: 10,
    },
    nama:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gambar:{
        width: 90,
        height: 90,
      },
      belakang:{
        padding: 10, 
        backgroundColor: Putih, 
        borderRadius: 10, 
        marginBottom: 5,
        borderWidth: 1,
        borderColor: Ijo,
      },
})