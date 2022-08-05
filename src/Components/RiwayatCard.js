import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')


const RiwayatCard = ({ item }) => {

  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      layanan: item.layanan,
      pukul: item.pukul,
      tanggal: item.tanggal,
      daftar_produk: item.daftar_produk,
      namaPelanggan: item.namaPelanggan,
      jml_produk: item.jml_produk,
      namatoko: item.namatoko,
      id_transaksi: item.id_transaksi,
      sub_total: item.sub_total,
      biaya_layanan: item.biaya_layanan,
      hargatotal: item.hargatotal,
    })
  }

  return (
    <Pressable style={styles.card}
       onPress={pindahDetail}
    >
      <Image source={DPkartu} style={styles.foto} />
      <View>
        <Text
        style={{fontSize:18, fontWeight:'bold', color:IjoTua}}
        >
            {item.namaPelanggan}
        </Text>
        <Text style={{fontSize:16, color:Ijo}}>
            <Text>Rp</Text>
            <Text>{item.hargatotal}</Text>
            <Text> | </Text>
            <Text>{item.jml_produk} </Text>
            <Text>Produk</Text>
        </Text>
        <View style={{flexDirection:'row'}}>
          <Text>{item.tanggal}</Text>
          <Text>  </Text>
          <Text>{item.pukul}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize: 12}}>Layanan: </Text>
          <Text style={{color:Ijo, fontSize: 12}}>{item.layanan}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default RiwayatCard

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
        width: height * 0.12,
        height: height * 0.12,
        borderRadius: 10,
        margin: 10,
    }
})