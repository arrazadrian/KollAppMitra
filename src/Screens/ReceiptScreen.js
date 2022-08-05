import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { KollLong } from '../assets/Images/Index';

const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  const { 
       layanan, tanggal, pukul, id_transaksi, daftar_produk,
     } = route.params;

  return (
    <View style={styles.latar}>
          <Image source={KollLong} style={styles.logo}/>
          <View style={{
            flexDirection:'row', borderBottomWidth: 0.8,
            marginBottom: 20, height: height* 0.08,
            borderColor: Ijo,
            }}>
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={styles.subjudul}>Jenis Layanan</Text>
              <Text>{layanan}</Text>
            </View>
            <View style={{flex:1,  alignItems:'center'}}>
              <Text style={styles.subjudul}>{tanggal}</Text>
              <Text>{pukul}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.subjudul}>ID Transaksi</Text>
              <Text>{id_transaksi}</Text>
          </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,
    paddingHorizontal: 20,
  },
  logo:{
     width: width*0.3,
     height: height*0.1,
    alignSelf:'center'
  },
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
  }
}) 