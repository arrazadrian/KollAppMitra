import { StyleSheet, Text, View, Switch, Pressable, Image} from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import { Gerobak, PreOrder } from '../assets/Images/Index';

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.latar}>
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
          }}>Sayur Aa Anri</Text>
        </View>
        <View>
          <Text style={{color: Ijo, fontSize:16}}>Hari ini:</Text>
          <Text style={{color: Ijo, fontWeight:'bold'}}>Senin, 20 Feb 2022</Text>
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
        <View style={{flexDirection:'row'}}>
            <Pressable style={styles.card} onPress={() => navigation.push('ProdukScreen')}>
              <Image source={Gerobak} style={styles.gambar}/>
              <Text style={styles.cardtext}>On Demand Products</Text>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.push('PreOrderScreen')}>
              <Image source={PreOrder} style={styles.gambar}/>
              <Text style={styles.cardtext}>Pre-Order Products</Text>
            </Pressable>
        </View>
      </View>
    </View>
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
    width: 120,
    height: 180,
    padding: 15,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: Ijo,
    alignItems: 'center',
    elevation: 5,
  },
  gambar:{
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})