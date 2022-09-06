import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, Image, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { KollLong } from '../assets/Images/Index';
import ListReceipt from '../Components/ListReceipt';
import moment from 'moment';
import localization from 'moment/locale/id';


const { width, height } = Dimensions.get('window')

const ReceiptScreen = ({route}) => {

  moment.updateLocale('id', localization)

  const { 
    hargalayanan, hargasubtotal, hargatotalsemua, id_mitra, id_pelanggan, id_transaksi,  jenislayanan,
    jumlah_kuantitas, namamitra, namatoko, namapelanggan, produk, waktu, 
     } = route.params;

  return (
    <View style={styles.latar}>
      <View style={styles.kertas}>
      <View>
        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'center', marginBottom: 10}}>
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
        <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>Jenis Layanan</Text>
                <Text>{jenislayanan}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.subjudul}>ID Transaksi</Text>
                <Text>{id_transaksi}</Text>
            </View>
        </View>

        <View style={{borderBottomWidth:1, borderColor: Ijo}}/>
    
        <View style={{ marginVertical: 10 }}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Nama Mitra</Text>
                  <Text>{namamitra}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Waktu Transaksi</Text>
                  <Text>{moment(waktu.toDate()).calendar()}</Text>
              </View>
        </View>
    
        <View style={{borderBottomWidth:1, borderColor: Ijo, marginBottom:10}}/>
        </View>
        <Text  style={styles.subjudul}>Daftar Produk</Text>
        <ScrollView>
          {Object.entries(produk).map(([key, items]) => (
              <View key={key}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.deskripsi}>
                        <Text>{items.length}x   </Text>
                        <Text>{items[0]?.namaproduk}</Text>
                    </Text>
                    <Text style={styles.harga}>
                        <Text>Rp</Text>
                        <Text>{items[0]?.harga}</Text>
                    </Text>
                </View>
              </View>
          ))}
        </ScrollView>
        <View style={{borderBottomWidth:1, borderColor: Ijo, marginBottom: 10}}/>
        <View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Sub Total</Text>
                  <Text>{hargasubtotal}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Biaya Layanan</Text>
                  <Text>{hargalayanan}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.subjudul}>Total Harga</Text>
                  <Text style={styles.subjudul}>{hargatotalsemua}</Text>
              </View>
        </View>
      </View>
      <View style={{flex: 1, justifyContent:'center'}}>
        <Text style={{color: Putih, textAlign: 'center', fontSize: 16, fontStyle:'italic'}}>
          Terima Kasih sudah berbelanja.
        </Text>
        <Text style={{color: Putih, textAlign: 'center', fontSize: 16, fontStyle:'italic'}}>
          Butuh sayur? Koll aja!
        </Text>
      </View>
    </View>
  )
}

export default ReceiptScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: IjoTua,
    flex: 1,
    padding: 20,
  },
  kertas:{
    flex: 7,
    backgroundColor: Kuning,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
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
  harga:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
},
}) 