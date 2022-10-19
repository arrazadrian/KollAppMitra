import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import * as Linking from 'expo-linking';
import { Ijo, IjoMint, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { KollLong, Location } from '../assets/Images/Index';
import { Call, Chat } from '../assets/Icons/Index';
import ListReceipt from '../Components/ListReceipt';
import moment from 'moment';
import localization from 'moment/locale/id';
import GarisBatas from '../Components/GarisBatas';
import { selesaikanPO } from '../../API/firebasemethod';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  moment.updateLocale('id', localization);

  const navigation = useNavigation();

  const { 
    hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
    jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu_selesai, waktu_dipesan, alamat_pelanggan,
    status_transaksi, catatan, phonemitra, phonepelanggan,
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
    try{
        selesaikanPO(id_transaksi);
        navigation.navigate("TQScreen"); 
    } catch (err){
      Alert.alert('Ada error menyelesaikan pre-order!', err.message);
    }  
  };

  return (
    <View style={styles.latar}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', marginBottom: 10, paddingTop: 20}}>
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
                <Text style={styles.subjudul}>Jenis Layanan</Text>
                <Text>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>ID Transaksi</Text>
                <Text>{id_transaksi}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Status Transaksi</Text>
                  <Text>{status_transaksi}</Text>
              </View>
              { waktu_selesai ? 
                (
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Selesai Transaksi</Text>
                    <Text>{moment(waktu_selesai.toDate()).calendar()}</Text>
                </View>
                ):(
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.subjudul}>Waktu Pemesanan</Text>
                    <Text>{moment(waktu_dipesan.toDate()).calendar()}</Text>
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
                {catatan ?(
                  <View style={styles.catatan}>
                    <Text style={{fontWeight:'bold'}}>Catatan lokasi</Text>
                    <Text style={{fontStyle:'italic'}}>{catatan}</Text>
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
                {Object.entries(produk).map(([key, items]) => (
                    <View key={key}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={styles.deskripsi}>
                              <Text>{items.length}x   </Text>
                              <Text>{items[0]?.namaproduk}</Text>
                          </Text>
                          <Text style={styles.harga}>
                              <Text>Rp</Text>
                              <Text>{items[0]?.harga * items.length}</Text>
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
                  <Text style={styles.subjudul}>Sub Total</Text>
                  <Text>Rp{hargasubtotal}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Biaya Layanan</Text>
                  <Text>Rp{hargalayanan}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Total Harga</Text>
                  <Text style={styles.subjudul}>Rp{hargatotalsemua}</Text>
              </View>
              { status_transaksi == "Dalam Proses" && 
                  <TouchableOpacity style={styles.diantar} onPress={selesaiTransaksiPO}>
                    <Text style={{color: Putih, fontSize: 18, fontWeight:'bold'}}>Sudah diantar dan dibayar</Text>
                  </TouchableOpacity>
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
    borderRadius: 20,
  },
  bagian:{
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
}) 