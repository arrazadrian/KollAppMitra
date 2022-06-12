import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'


const ProdukScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <ScrollView>
      <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Utama</Text>
        <Text style={styles.deskripsi}>Produk Utama adalah produk yang siap dibawa mitra.</Text>
      </View>
        <ListProduk />

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

export default ProdukScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,
    padding: 10,
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
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
})