import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import * as Linking from 'expo-linking';
import { Ijo, IjoMint, IjoTua, Kuning, Putih, Pink} from '../Utils/Warna'
import { Kasbon, KollLong, Location, Lunas } from '../assets/Images/Index';
import { Call, Chat } from '../assets/Icons/Index';
import moment from 'moment';
import localization from 'moment/locale/id';
import GarisBatas from '../Components/GarisBatas';
import { selesaikanPO } from '../../API/firebasemethod';
import { useNavigation } from '@react-navigation/native';
import "intl";
import "intl/locale-data/jsonp/id";


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  moment.updateLocale('id', localization);

  const navigation = useNavigation();

  const { 
    hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
    jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu_selesai, waktu_dipesan, alamat_pelanggan,
    status_transaksi, catatan_lokasi, catatan_produk, phonemitra, phonepelanggan, pembayaran,
     } = route.params;

  const telepon = () => {
    Linking.openURL(`tel:${phonepelanggan}`);
  };

  const sms = () => {
    Linking.openURL(`sms:${phonepelanggan}`);
  };

  const selesaiTransaksiPO =()=> {
    Alert.alert('Apakah pelanggan sudah menerima produk?','Pastikan belanjaan sudah diterima dan pelanggan sudah melunasi belanjaan.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: selesaiPO,
            }
          ]
          )
  }

  async function selesaiPO(){
    let pembayaran = 'Lunas';
    try{
        selesaikanPO(id_transaksi, pembayaran);
        navigation.navigate("TQScreen"); 
    } catch (err){
      Alert.alert('Ada error menyelesaikan pre-order!', err.message);
    }  
  };

  const pindahKasbon = () => {
    navigation.navigate('AdaKasbonPOScreen',{
      id_pelanggan: id_pelanggan,
      id_transaksi: id_transaksi,
      namamitra: namamitra,
      namatoko: namatoko,
      namapelanggan: namapelanggan,
      phonepelanggan: phonepelanggan,
      hargatotalsemua: hargatotalsemua,
    });
  };


  return (
    <View style={styles.latar}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', paddingTop: 20}}>
          <View>
              <Image source={KollLong} style={styles.logo}/>
          </View>
          <View>
              <Text style={{color: IjoTua, fontSize: 16, fontWeight: 'bold', marginBottom: -5}}>
                Nama Toko
              </Text>
              <Text style={{color: Ijo, fontSize: 18, fontWeight: 'bold'}}>
                {namatoko}
              </Text>
          </View>
        </View>
        <View style={styles.bagian}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.atasdesk}>Jenis Layanan</Text>
                <Text style={styles.atasdesk}>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.atasdesk}>ID Transaksi</Text>
                <Text style={styles.atasdesk}>{id_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.atasdesk}>Status Transaksi</Text>
                  <Text style={styles.atasdesk}>{status_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.atasdesk}>Pembayaran</Text>
                  <Text style={styles.atasdesk}>{pembayaran}</Text>
            </View>
              { waktu_selesai ? 
                (
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.atasdesk}>Selesai Transaksi</Text>
                    <Text style={styles.atasdesk}>{moment(waktu_selesai.toDate()).calendar()}</Text>
                </View>
                ):(
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.atasdesk}>Waktu Pemesanan</Text>
                    <Text style={styles.atasdesk}>{moment(waktu_dipesan.toDate()).calendar()}</Text>
                </View>
                )
              }
        </View>

        <GarisBatas/>
      
        <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View>
                    <Text style={styles.subjudul}>Nama Pelanggan</Text>
                    <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>{namapelanggan}</Text>
                </View>
                { status_transaksi == "Dalam Proses" && (
                  <View style={{flexDirection: 'row'}}>
                    <Pressable onPress={telepon}>
                       <Image style={styles.aksi} source={Call}/>
                    </Pressable>
                    <Pressable  onPress={sms}>
                        <Image style={styles.aksi} source={Chat}/>
                    </Pressable>
                  </View>
                )}
                { status_transaksi == "Selesai" && pembayaran == "Lunas" &&
                  <Image source={Lunas} style={{width: width * 0.2, height: width * 0.2, marginVertical: -20}}/>
                }
                { status_transaksi == "Selesai" && pembayaran == "Kasbon" &&
                  <Image source={Kasbon} style={{width: width * 0.2, height: width * 0.2, marginVertical: -20}}/>
                }
              </View>
        </View>
      
        <GarisBatas/>
              
        { alamat_pelanggan &&
        <View>
            <View style={styles.bagian}>
                <Text  style={styles.subjudul}>Alamat Tujuan</Text>
                <View style={{flexDirection:'row', alignItems:'center', width:'90%'}}>
                    < Image source={Location} style={styles.location} />
                    <Text>{alamat_pelanggan}</Text>
                </View>
                {catatan_lokasi ?(
                  <View style={styles.catatan}>
                    <Text style={{fontWeight:'bold'}}>Catatan lokasi</Text>
                    <Text style={{fontStyle:'italic'}}>{catatan_lokasi}</Text>
                  </View>
                ):(
                  <View style={styles.catatan}>
                    <Text style={{fontStyle:'italic'}}>Tanpa catatan lokasi...</Text>
                  </View>
                ) 
                }
                <View style={styles.reminder}>
                    <Text style={{color: Putih}}>Paling lambat diantar:</Text>
                    <Text style={{color: Putih, fontWeight:'bold'}}>{moment(waktu_dipesan.toDate()).add(1, 'days').format('LLLL')}</Text>
                </View>
            </View>
            <GarisBatas/>
        </View>
        }
        <View style={styles.bagian}>
          <View style={{marginBottom: height* 0.25}}>
              <Text  style={styles.subjudul}>Daftar Produk</Text>
              {catatan_produk ?
                (
                  <View style={[styles.catatan, {marginBottom: 10}]}>
                    <Text style={{fontWeight:'bold'}}>Catatan produk</Text>
                    <Text style={{fontStyle:'italic'}}>{catatan_produk}</Text>
                  </View>
                ): !catatan_produk && jenislayanan == "Pre-Order" ? (
                  <View style={[styles.catatan, {marginBottom: 10}]}>
                    <Text style={{fontStyle:'italic'}}>Tanpa catatan produk...</Text>
                  </View>
                ):( <View/> ) 
              }
                {Object.entries(produk).map(([key, items]) => (
                    <View key={key}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={styles.deskripsi}>
                              <Text>{items.length}x   </Text>
                              <Text>{items[0]?.namaproduk}</Text>
                          </Text>
                          <Text style={styles.harga}>
                              <Text>Rp</Text>
                              <Text>{new Intl.NumberFormat('id-Id').format(items[0]?.harga * items.length).toString()}</Text>
                          </Text>
                      </View>
                    </View>
                ))}
          </View>
        </View>

      </ScrollView>
      <View style={styles.bawah}>
          <View style={styles.bagian}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text>Sub Total</Text>
                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargasubtotal).toString()}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text>Biaya Layanan</Text>
                  <Text>Rp{new Intl.NumberFormat('id-Id').format(hargalayanan).toString()}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Total Harga</Text>
                  <Text style={styles.subjudul}>Rp{new Intl.NumberFormat('id-Id').format(hargatotalsemua).toString()}</Text>
              </View>
              { status_transaksi == "Dalam Proses" && 
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <TouchableOpacity style={styles.kasbon} onPress={pindahKasbon}>
                    <Text style={{color: Ijo, fontSize: 16, fontWeight:'bold'}}>Masuk kasbon</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.diantar} onPress={selesaiTransaksiPO}>
                    <Text style={{color: Putih, fontSize: 16, fontWeight:'bold'}}>Sudah dibayar</Text>
                  </TouchableOpacity>
                </View>
              }
          </View>
      </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: Kuning,
    height: height,
  },
  logo:{
     width: width*0.29,
     height: height*0.06,
     marginRight: 10,
  },
  subjudul:{
    fontSize: 16,
    color: IjoTua,
    fontWeight:'bold',
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  atasdesk:{
    fontSize: 12,
    color: IjoTua,
  },
  aksi:{
    width: width * 0.1,
    height: width * 0.1,
    marginHorizontal: 5,
  },
  reminder:{
    backgroundColor: IjoTua,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
  location:{
    width: width * 0.05,
    height: width * 0.05,
    marginRight:5,
  },
  catatan:{
    borderColor: Ijo,
    borderWidth:1,
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginTop: 10,
},
  harga:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
  },
  bawah:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position:'absolute',
    bottom:0,
    width: width,
    backgroundColor:IjoMint,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection:'column-reverse',
  },
  diantar:{
    backgroundColor: Ijo,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '46%'
  },
  kasbon:{
    backgroundColor: Putih,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '46%'
  },
  bagian:{
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
}) 