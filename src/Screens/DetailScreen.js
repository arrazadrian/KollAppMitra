import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { IkanMujaer } from '../assets/Images/Index'
import { Ijo, IjoMint, IjoTua, Kuning } from '../Utils/Warna'


const DetailScreen = ({ navigation, route }) => {
  
  return (
    <View style={styles.latar}>
      <Image source={IkanMujaer} style={styles.gambar}/>
      <View style={{marginBottom:2}}>
        <Text style={styles.subjudul}>{route.params.nama}</Text>
        <Text style={styles.deskripsi}>Ikan Mujaer asal kepulauan arafuru yang nikmat kalo dimakan sore hari di bawah senja di ua adga</Text>
      </View>
      <View>
        <Text style={{fontSize:20, color:IjoTua, fontWeight:'bold'}}>Rp{route.params?.harga} | {route.params.kuantitas}{route.params.satuan}</Text>     
      </View>
      <Pressable style={styles.tombol}
        onPress={() => navigation.goBack()}>
            <Text style={styles.tomboltext}>Kembali</Text>
      </Pressable>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 100,
    },
    gambar:{
        height: 350,
        width: 350,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Ijo,
        marginBottom: 10,
        alignSelf:'center'
    },
    subjudul:{
        fontSize: 26,
        color: Ijo,
        fontWeight:'bold',
    },
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
        textAlign:'justify',
    },
    tombol:{
        position:'absolute',
        fontSize: 20,
        backgroundColor: IjoMint,
        borderRadius: 20,
        bottom: 30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        height: 50,
        width: 300,
    },
    tomboltext:{
        color: Ijo,
        fontWeight:'bold',
        fontSize: 20,
        
    },
})