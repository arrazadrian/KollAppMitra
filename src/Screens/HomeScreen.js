import { StyleSheet, Text, View, Switch, Pressable, Image, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna';
import { Gerobak, PreOrder, TemuLangsung } from '../assets/Images/Index';
import moment from 'moment';
import localization from 'moment/locale/id';

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  moment.updateLocale('id', localization)
  let tanggal = moment().locale('id');

  return (
    <ScrollView style={styles.latar}>
      <View style={{
        paddingTop: 20,
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 20,
        }}>
        <View>
          <Text style={{
            fontSize: 20,
            color: Ijo,
            marginBottom: -7,
          }}>Selamat Datang!</Text>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: IjoTua,
            width: 200,
          }}>Sayur Aa Anri</Text>
        </View>
        <View>
          <Text style={{color: Ijo, fontSize:16}}>Hari ini:</Text>
          <Text style={{color: Ijo, fontWeight:'bold'}}>{tanggal.format('dddd, DD MMMM YYYY')}</Text>
        </View>
      </View>
      <View style={styles.status}>
        <View>
            <Text style={styles.judul}>Status Anda: 
            <Text style={{color: IjoTua}}> Aktif</Text>
            </Text>
            <Text style={styles.deskripsi}>Anda aktif terlacak calon pelanggan.</Text>
        </View>
          <Switch
            trackColor={{ false: '#767577', true: Ijo }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
      </View>
      <View>
        <Text style={styles.judul}>Etalase Produk</Text>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Pressable style={styles.card} onPress={() => navigation.push('ProdukScreen')}>
              <Image source={Gerobak} style={styles.gambar}/>
              <Text style={styles.cardtext}>Produk Utama</Text>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.push('PreOrderScreen')}>
              <Image source={PreOrder} style={styles.gambar}/>
              <Text style={styles.cardtext}>Produk Pre-Order</Text>
            </Pressable>
        </View>
          <Text style={styles.judul}>Bertemu di Jalan?</Text>
          <Pressable style={styles.langsung} onPress={() => navigation.push('LangsungScreen')}>
            <View>
              <Text style={styles.texttemu}>Temu Langsung</Text>
              <Text style={styles.deskripsi}>Buat transaksi baru saat bertemu</Text>
            </View>
            <Image source={TemuLangsung} style={styles.gambartemu}/>
          </Pressable>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    padding: 20,
  },
  status: {
    backgroundColor: Putih,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: Ijo,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Ijo,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  cardtext:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
  },
  card:{
    backgroundColor: Putih,
    width: '45%',
    height: 170,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: Ijo,
    alignItems: 'center',
    elevation: 5,
  },
  gambar:{
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  langsung:{
    backgroundColor: Putih,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gambartemu:{
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  texttemu:{
    fontSize: 20,
    fontWeight: 'bold',
    color: IjoTua,
  },
})