import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Abu, Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna'
import { TemuLangsung, PanggilMitra, PreOrder } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/id';
import "intl";
import "intl/locale-data/jsonp/id";

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
      waktu_dipesan: item.waktu_dipesan,
      waktu_selesai: item.waktu_selesai,
      status_transaksi: item.status_transaksi,
      catatan_lokasi: item?.catatan_lokasi,
      catatan_produk: item?.catatan_produk,
      pembayaran: item?.pembayaran,
      id_transaksi: item.id,
    })
  }

  return (
    <Pressable style={styles.card}
       onPress={pindahDetail}
      >
    { item.jenislayanan == 'Temu Langsung' ? (
      <Image source={TemuLangsung} style={styles.foto} />      
      ): item.jenislayanan == 'Panggil Mitra' ? (
        <Image source={PanggilMitra} style={styles.foto} />      
      ) : (
        <Image source={PreOrder} style={styles.foto} />
      )
    }
      <View>
        <Text
        style={{fontSize:18, fontWeight:'bold', color:IjoTua}}
        >
            {item.namapelanggan}
        </Text>
        <Text style={{fontSize:14, color:Ijo}}>
            <Text>Rp{new Intl.NumberFormat('id-Id').format(item.hargatotalsemua).toString()}</Text>
            <Text> | </Text>
            <Text>{item.jumlah_kuantitas} Produk</Text>
        </Text>
        <View>
          { item.jenislayanan == 'Pre-Order' ? 
            (
              <Text style={{fontSize: 14}}>Diterima pada {moment(item.waktu_selesai.toDate()).format('ll')}</Text>
            ):(
              <Text style={{fontSize: 14}}>{moment(item.waktu_selesai.toDate()).format('lll')}</Text>
            ) 
          }
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
        padding: 10,
    },
    foto:{
        width: height * 0.1,
        height: height * 0.1,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: IjoMint,
        alignItems:'center',
        justifyContent:'center',
    },
})