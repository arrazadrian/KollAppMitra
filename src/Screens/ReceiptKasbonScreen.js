import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DompetKasbon, KollLong } from '../assets/Images/Index'
import GarisBatas from '../Components/GarisBatas'

const { width, height } = Dimensions.get('window')

const ReceiptKasbonScreen = () => {
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
              <Text>128237bhjadasa</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Status Kasbon</Text>
              <Text>Belum Lunas</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>Tanggal Dibuat</Text>
              <Text>10 - 1 - 2022</Text>
          </View>
      </View>
      <GarisBatas/>
      <View style={styles.bagian}>
        <Text style={styles.subjudul}>Nama Pelanggan</Text>
          <Text style={[styles.subjudul, {color: Ijo, fontSize: 20}]}>Hooa Hamep</Text>
      </View>
      <GarisBatas/>
      <View style={styles.bagian}>
        <Text style={styles.subjudul}>Daftar Transaksi</Text>
        <View style={styles.transaksi}>
          <View>
            <Text style={{fontSize: 12}}> ID: 2e1890138012</Text>
            <Text style={{color:Ijo, fontSize: 16}}>8 Febura 2081</Text>
          </View>
          <Text style={{color: IjoTua, fontSize: 18}}>Rp67000</Text>
        </View>
      </View>
      <View style={styles.bawah}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 10, alignItems:'center'}}>
          <Text>Total Kasbon</Text>
          <Text style={styles.subjudul}>Rp340500</Text>
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
})