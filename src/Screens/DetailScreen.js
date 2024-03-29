import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { IkanMujaer } from '../assets/Images/Index'
import { Ijo, IjoMint, IjoTua, Kuning } from '../Utils/Warna'
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')

const DetailScreen = ({ navigation, route }) => {

  const { namaproduk, deskproduk, image, harga, satuan, kuantitas, tersedia } = route.params;

  return (
    <View style={styles.latar}>
      <View style={{alignItems:'center'}}>
          <Image source={{uri:image}} style={styles.gambar}/>
          { !tersedia && 
          <View style={styles.bungkushabis}>
            <Text style={styles.habis}>Stok Habis</Text>
          </View>
          }
      </View>
      <View style={{marginBottom:2}}>
        <Text style={styles.subjudul}>{namaproduk}</Text>
        <Text style={styles.deskripsi}>{deskproduk}</Text>
      </View>
      <View>
        <Text style={{fontSize:20, color:IjoTua, fontWeight:'bold'}}>Rp{new Intl.NumberFormat('id-Id').format(harga).toString()} | {kuantitas}{satuan}</Text>     
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
        justifyContent:'center',
    },
    gambar:{
        height: width*0.9,
        width: width*0.9,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Ijo,
        marginBottom: 10,
        alignSelf:'center',
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
    habis:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'tomato',
      textAlign: 'center',
    },
    bungkushabis:{
      backgroundColor:"#FAEAED", 
      position: 'absolute',
      padding: 8,
      width: width * 0.5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    }
})