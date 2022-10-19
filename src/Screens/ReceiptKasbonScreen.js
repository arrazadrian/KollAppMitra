import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DompetKasbon, KollLong } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas'
import moment from 'moment'
import localization from 'moment/locale/id'
import { Call, Chat } from '../assets/Icons/Index'
import * as Linking from 'expo-linking'

const { width, height } = Dimensions.get('window')


const ReceiptKasbonScreen = ({ route }) => {

  moment.updateLocale('id', localization);

  const { 
    id_kasbon, id_mitra, namamitra, namatoko, phonemitra, id_pelanngan, status_kasbon,
    namapelanggan, phonepelanggan, waktu_dibuat, transaksi, total_kasbon,
     } = route.params;

     const telepon = () => {
      Linking.openURL(`tel:${phonepelanggan}`);
    };
  
    const sms = () => {
      Linking.openURL(`sms:${phonepelanggan}`);
    };

  return (
    <View style={styles.latar}>
      <View style={styles.atas}>
          <Image source={DompetKasbon} style={styles.dompet}/>
          <View>
            <Text style={{color: IjoTua, fontSize: 16, fontWeight: 'bold', marginBottom: -5}}>Nama Toko</Text>
            <Text style={{color: Ijo, fontSize: 18, fontWeight: 'bold'}}>Cempaka Hijau Segar</Text>
          </View>
      </View>
      <View style={styles.bagian}>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>ID Kasbon</Text>
              <Text>{id_kasbon}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Status Kasbon</Text>
              <Text>{status_kasbon}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Mulai Tanggal</Text>
              <Text>{moment(waktu_dibuat.toDate()).calendar()}</Text>
          </View>
      </View>
      <GarisBatas/>
      <View style={styles.bagian}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View>
                <Text style={styles.subjudul}>Nama Pelanggan</Text>
                <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>{namamitra}</Text>
            </View>
            { status_kasbon == "Belum Lunas" && (
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
      <View style={styles.bagian}>
        <Text style={{fontSize: 16, color: IjoTua, fontWeight:'bold', marginBottom: 10 }}>Daftar Transaksi</Text>
        {transaksi.map(key => (
          <View key={key}>
              <View style={styles.transaksi}>
                <View>
                  <Text style={{fontSize: 12}}> ID: {transaksi[0]?.id}</Text>
                  <Text style={{color:Ijo, fontSize: 16}}>{moment(transaksi[0]?.waktu_transaksi.toDate()).calendar()}</Text>
                </View>
                <Text style={{color: IjoTua, fontSize: 16}}>Rp{transaksi[0]?.harga_total}</Text>
              </View> 
          </View>
        ))}
      </View>
      <View style={styles.bawah}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 10, alignItems:'center'}}>
          <Text>Total Kasbon</Text>
          <Text style={styles.subjudul}>Rp{total_kasbon}</Text>
        </View>
        <TouchableOpacity style={styles.tombol}>
            <Text style={[styles.subjudul, {color: Ijo, fontSize: 20, textAlign:'center'}]}>Sudah Lunas</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReceiptKasbonScreen

const styles = StyleSheet.create({
    latar:{
      flex: 1,
      backgroundColor: Kuning,
    },
    atas:{
      flexDirection:'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems:'center',
      justifyContent:'center',
    },
    bagian:{
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dompet:{
      width: width*0.2,
      height: height*0.06,
      marginRight: 10,
    },
    subjudul:{
      fontSize: 16,
      color: IjoTua,
      fontWeight:'bold',
    },
    transaksi:{
      backgroundColor:Putih,
      padding: 10,
      borderRadius: 10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom: 10,
    },
    bawah:{
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position:'absolute',
      bottom:0,
      width: width,
      backgroundColor:IjoMint,
      padding: 20,
    },
    tombol:{
      borderColor: Ijo,
      borderWidth: 3,
      width:'100%',
      padding: 8,
      borderRadius: 10,
    },
    aksi:{
      width: width * 0.1,
      height: width * 0.1,
      marginHorizontal: 5,
    },
})