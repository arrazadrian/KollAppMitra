import { StyleSheet, Text, View, Pressable, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import { KollLong } from '../assets/Images/Index'
import { daftarproduk } from '../Data/daftarproduk'

const ProdukScreen = ({ navigation }) => {
  return (
    <View style={styles.latar}>
      <View>
      <View style={{flexDirection:'row', marginVertical:10}}>
        <Image source={KollLong} style={styles.logopojok} />
        <PencarianBar />
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Utama</Text>
        <Text style={styles.deskripsi}>Produk utama adalah produk yang siap dibawa mitra.</Text>
      </View>
      <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom:80}}>
       <FlatList
          data={daftarproduk}
          renderItem= {ListProduk}
          keyExtractor={ daftarproduk => daftarproduk.id}
          ListEmptyComponent={<Text>Produk utama masih kosong</Text>}
       />
      </View>
      </View>
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
    paddingHorizontal: 10,
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
    bottom: 15,
    right: 20,
    height: 70,
    width: 70,
    backgroundColor: Ijo,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logopojok:{
    width: 80,
    height: 40,
  },
})