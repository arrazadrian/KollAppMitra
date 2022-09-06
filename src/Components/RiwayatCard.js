import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/id';

const { width, height } = Dimensions.get('window')


const RiwayatCard = ({ item }) => {

  moment.updateLocale('id', localization)

  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      hargalayanan: item.hargalayanan,
      hargasubtotal: item.hargasubtotal,
      hargatotalsemua: item.hargatotalsemua,
      id_mitra: item.id_mitra,
      id_pelanngan: item.id_mitra,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      namapelanggan: item.namapelanggan,
      produk: item.produk,
      waktu: item.waktu,
      id_transaksi: item.id,
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
            {item.namatoko}
        </Text>
        <Text style={{fontSize:16, color:Ijo}}>
            <Text>Rp</Text>
            <Text>{item.hargatotalsemua}</Text>
            <Text> | </Text>
            <Text>{item.jumlah_kuantitas} </Text>
            <Text>Produk</Text>
        </Text>
        <View style={{flexDirection:'row'}}>
          <Text>{moment(item.waktu.toDate()).calendar()}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize: 12}}>Layanan: </Text>
          <Text style={{color:Ijo, fontSize: 12}}>{item.jenislayanan}</Text>
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
        marginBottom: 5,
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