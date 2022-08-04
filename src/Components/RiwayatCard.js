import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')


const RiwayatCard = ({ item }) => {

  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
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
      <Text>{item.waktu}</Text>
      <Text>ID: {item.id_transaksi}</Text>
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