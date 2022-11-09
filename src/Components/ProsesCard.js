import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import React from 'react';
import { Ijo, IjoMint, IjoTua, Putih } from '../Utils/Warna';
import { PanggilMitra, PreOrder, TemuLangsung } from '../assets/Images/Index';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import localization from 'moment/locale/id';
import "intl";
import "intl/locale-data/jsonp/id";
import { kosongkanKeranjang } from '../features/keranjangSlice';
import { resetVoucher } from '../features/voucherSlice';
import { useDispatch } from 'react-redux';
import { resetBobot } from '../features/bobotSlice';
import { resetDatapm } from '../features/datapmSlice';

const { width, height } = Dimensions.get('window')

const ProsesCard = ({ item }) => {

  moment.updateLocale('id', localization);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pindahPanggilan = async () => {
    await dispatch(kosongkanKeranjang());
    await dispatch(resetVoucher());
    await dispatch(resetBobot());
    await dispatch(resetDatapm());
    navigation.navigate('PanggilanScreen', { 
      alamat_pelanggan: item?.alamat_pelanggan,
      id_mitra: item.id_mitra,
      id_pelanggan: item.id_pelanggan,
      jenislayanan: item.jenislayanan,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      status_transaksi: item?.status_transaksi,
      waktu_dipesan: item?.waktu_dipesan,
      catatan_lokasi: item?.catatan_lokasi,
      geo_alamat: item.geo_alamat,
      id_transaksi: item.id,
      hargalayanan: item.hargalayanan,
    })
  };

  const pindahDetail = () => {
    navigation.navigate('ReceiptScreen', { 
      alamat_pelanggan: item?.alamat_pelanggan,
      hargalayanan: item.hargalayanan,
      hargasubtotal: item.hargasubtotal,
      hargatotalsemua: item.hargatotalsemua,
      id_mitra: item.id_mitra,
      id_pelanggan: item.id_pelanggan,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      produk: item.produk,
      status_transaksi: item?.status_transaksi,
      waktu_selesai: item?.waktu_selesai,
      waktu_dipesan: item?.waktu_dipesan,
      catatan_lokasi: item?.catatan_lokasi,
      catatan_produk: item?.catatan_produk,
      pembayaran: item?.pembayaran,
      id_voucher: item.id_voucher,
      potongan: item.potongan,
      id_transaksi: item.id,
    })
  };

  const pindahOtw = () => {
    navigation.navigate('OtwScreen', { 
      alamat_pelanggan: item.alamat_pelanggan,
      geo_alamat: item.geo_alamat,
      id_mitra: item.id_mitra,
      id_pelanggan: item.id_pelanggan,
      jenislayanan: item.jenislayanan,
      jumlah_kuantitas: item.jumlah_kuantitas,
      namamitra: item.namamitra,
      namatoko: item.namatoko,
      phonemitra: item.phonemitra,
      namapelanggan: item.namapelanggan,
      phonepelanggan: item.phonepelanggan,
      status_transaksi: item?.status_transaksi,
      waktu_selesai: item?.waktu_selesai,
      waktu_dipesan: item?.waktu_dipesan,
      catatan_lokasi: item?.catatan_lokasi,
      id_transaksi: item.id,
      panggilan: item.panggilan,
      estimasi_waktu: item.estimasi_waktu,
    })
  };

  return (
    <View>
    { (item.jenislayanan == "Pre-Order" && item.status_transaksi == "Dalam Proses") ? 
      (
      <Pressable style={styles.card} onPress={pindahDetail}>
          <Image source={PreOrder} style={styles.foto} />
          <View style={{flex: 3}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                  {item.namapelanggan}
              </Text>
              <View>
                    <Text style={{fontSize:14, color:Ijo}}>
                    DL: {moment(item.waktu_dipesan.toDate()).add(2, 'days').format('lll')}
                    </Text>  
                    <Text style={{fontSize:14, color:Ijo, fontWeight:'bold'}}>
                      Rp{new Intl.NumberFormat('id-Id').format(item.hargatotalsemua).toString()} | {item.jumlah_kuantitas} produk
                    </Text>  
              </View>
          </View>
      </Pressable>
      ): item.jenislayanan == "Panggil Mitra" && item.panggilan == "Menunggu Respon" ? (
      <Pressable style={styles.card} onPress={pindahPanggilan}>
          <Image source={PanggilMitra} style={styles.foto} />
          <View style={{flex: 3}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                  {item.namapelanggan}
              </Text>
              <View>
                    <Text style={{fontSize:14, color:Ijo, fontWeight:'bold'}}>
                      Ada panggilan pelanggan
                    </Text>  
                    <Text style={{fontSize:14, color:Ijo}} numberOfLines={2}>
                      {item.alamat_pelanggan} 
                    </Text>  
              </View>
          </View>
      </Pressable>
      ):(
      <Pressable style={styles.card} onPress={pindahOtw}>
          <Image source={PanggilMitra} style={styles.foto} />
          <View style={{flex: 3}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:IjoTua}}>
                  {item.namapelanggan}
              </Text>
              <View>
                    <Text style={{fontSize:14, color:Ijo, fontWeight:'bold'}}>
                      Ada panggilan pelanggan
                    </Text>  
                    <Text style={{fontSize:14, color:Ijo}} numberOfLines={2}>
                      {item.alamat_pelanggan} 
                    </Text>  
              </View>
          </View>
      </Pressable>
      )
    }
    </View>
  )
}

export default ProsesCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginVertical: 5,
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
    }
})