import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import localization from 'moment/locale/id'

const { width, height } = Dimensions.get('window')

const KasbonCard = ({ item }) => {
  const navigation = useNavigation();
  
  moment.updateLocale('id', localization);

  const pindahDetail = () => {
    navigation.navigate('ReceiptKasbonScreen', { 
      id_kasbon: item.id,
      id_mitra: item.id_mitra,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      id_pelanngan: item.id_pelanngan,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      status_kasbon: item.status_kasbon,
      waktu_dibuat: item.waktu_dibuat,
      transaksi: item.transaksi,
      total_kasbon: item.total_kasbon
    })
  };

  return (
    <Pressable style={styles.card} onPress={pindahDetail}>
      <View>
        <Text style={styles.nama}>{item.namapelanggan}</Text>
        <Text style={{fontSize: 12}}>Mulai dari: {moment(item.waktu_dibuat.toDate()).calendar()}</Text>
      </View>
      <View>
        <Text style={{marginBottom: -5, fontSize: 12, textAlign:'right'}}>Total Kasbon</Text>
        <Text style={styles.total}>Rp{item.total_kasbon}</Text>
      </View>
    </Pressable>
  )
}

export default KasbonCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    nama:{
        color: IjoTua,
        fontSize: 16,
        fontWeight: 'bold',
    },
    total:{
        color: Ijo,
        fontSize: 18,
        fontWeight: 'bold',
    },
})