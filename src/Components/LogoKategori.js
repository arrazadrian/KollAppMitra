import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

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
})