import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ListProduk from '../Components/ListProduk';

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.latar}>
      <View style={styles.container}>
          <Text style={{color:Putih, fontSize: 16}}>Status: Online</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Switch
              style={{marginVertical:2, marginHorizontal: 10}}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{color:Putih,fontSize: 18, fontWeight:'bold' }}>
              Anda aktif terlacak pelanggan
            </Text>
        </View>
      </View>
      <ScrollView style={{padding: 10}}>
        <View style={{marginBottom:10}}>
            <Text style={styles.judul}>
              Daftar Produk
            </Text>
            <Text style={styles.deskripsi}>
              Produk ini tampil pada layar pelanggan.
            </Text>
        </View>
          <ListProduk/>
      </ScrollView>
      <Pressable style={styles.tambah}
      onPress={() => navigation.navigate('TambahScreen')}
      >
        <Text style={{fontSize:30, fontWeight:'bold', color: Putih}}>
          +</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  container: {
    backgroundColor: Ijo,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tambah:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    width: 70,
    backgroundColor: Ijo,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  judul:{
    fontSize: 18,
    fontWeight: 'bold',
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
})