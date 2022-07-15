import { StyleSheet, Text, View, Switch, Pressable, Image, ScrollView, StatusBar, SafeAreaView, Dimensions, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna';
import { Gerobak, PreOrder, TemuLangsung } from '../assets/Images/Index';
import moment from 'moment';
import localization from 'moment/locale/id';
import PopupMasukPanggilan from '../Components/PopupMasukPanggilan';
import { 
  getAuth, 
 } from "firebase/auth";
 import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { app } from '../../Firebase/config';

const { width, height } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
  const [status, setStatus] = useState('Tidak Aktif');
  const [penjelasan, setPenjelasan] = useState('tidak');
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
  if(isEnabled){
    setStatus('Aktif')
    setPenjelasan('aktif')
  } else {
    setStatus('Tidak Aktif')
    setPenjelasan('tidak')
  }
    setIsEnabled(previousState => !previousState)
  }

  moment.updateLocale('id', localization)
  let tanggal = moment().locale('id');

  const [namalengkap, setNamalengkap] = useState('');
  const auth = getAuth();
  const db = getFirestore(app)

  useEffect(() => {
    async function getusername(){
      try {
        let docRef = doc(db, "mitra", "MHXG5gNsewz73Hlt35bS");
        const docSnap = await getDoc(docRef);
        setNamalengkap(docSnap.data().namalengkap)
      } catch (err){
      Alert.alert('There is an error.', err.message)
      }
    }
    getusername();
  })

  return (
    <View style={styles.latar}>
        <ScrollView>
          <View style={{
            flexDirection: 'row',
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
                fontSize: 24,
                fontWeight: 'bold',
                color: IjoTua,
              }}>{namalengkap}</Text>
            </View>
            <View>
              <Text style={{color: Ijo, fontSize:16}}>Hari ini:</Text>
              <Text style={{color: Ijo, fontWeight:'bold'}}>{tanggal.format('dddd, DD MMMM YYYY')}</Text>
            </View>
          </View>
          <View style={styles.status}>
            <View>
                <Text style={styles.judul}>Status Anda: 
                <Text> </Text>
                <Text style={{color: IjoTua}}>{status}</Text>
                </Text>
                <Text style={styles.deskripsi}>Anda {penjelasan} terlacak calon pelanggan.</Text>
            </View>
              <Switch
                trackColor={{ false: '#767577', true: Ijo }}
                thumbColor={isEnabled ? '#f4f3f4' : '#f5dd4b'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={!isEnabled}
              />
          </View>
          <View>
            <Text style={styles.judul}>Etalase Produk</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Pressable style={styles.card} onPress={() => navigation.push('ProdukScreen')}>
                  <Image source={Gerobak} style={styles.gambar}/>
                  <Text style={styles.cardtext}>Produk Utama</Text>
                </Pressable>
                <Pressable style={styles.card} 
                onPress={() => navigation.push('PreOrderScreen')}>
                  <Image source={PreOrder} style={styles.gambar}/>
                  <Text style={styles.cardtext}>Produk Pre-Order</Text>
                </Pressable>
            </View>
              <Text style={styles.judul}>Bertemu di Jalan?</Text>
              <Pressable style={styles.langsung} onPress={() => navigation.push('LangsungScreen')}>
                <View>
                  <Text style={styles.texttemu}>Temu Langsung</Text>
                  <Text style={styles.deskripsi}
                    numberOfLines={2}
                  >Buat transaksi baru saat bertemu</Text>
                </View>
                <Image source={TemuLangsung} style={styles.gambartemu}/>
              </Pressable>
          </View>
        </ScrollView>
          {/* <PopupMasukPanggilan/>  */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop:StatusBar.currentHeight + 10,
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
    flexWrap: 'wrap',
    width: width * 0.6 ,
  },
  cardtext:{
    fontSize: 16,
    color: IjoTua,
    fontWeight: 'bold',
  },
  card:{
    backgroundColor: Putih,
    width:  width*0.42,
    height: width*0.42,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: Ijo,
    alignItems: 'center',
    justifyContent:'space-between',
    elevation: 3,
    padding:10,
  },
  gambar:{
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  langsung:{
    width: '100%',
    height: height*0.16,
    backgroundColor: Putih,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gambartemu:{
    width: width*0.25,
    height: width*0.25,
    borderRadius: 10,
  },
  texttemu:{
    fontSize: 18,
    fontWeight: 'bold',
    color: IjoTua,
  },
})