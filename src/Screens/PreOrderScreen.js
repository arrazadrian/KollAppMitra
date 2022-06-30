import { StyleSheet, Text, View, Pressable, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import ProdukKosong from '../Components/ProdukKosong'
import { daftarpreproduk } from '../Data/daftarpreproduk'

const { width, height } = Dimensions.get('window')

const kosongpre = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk pre-order. Buat produk pre-order
      dengan ketuk tanda plus di kanan bawah.
    </Text>
  </View>
  )
}

const ataspre = () => {
  return(
    <View>
      <View style={{flexDirection:'row', marginVertical:10}}>
        <PencarianBar />
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Pre-Order</Text>
        <Text style={styles.deskripsi}>Produk yang diantar satu hari setelah pemesanan.</Text>
      </View>
    </View>
  )
}

const PreOrderScreen = ({navigation}) => {
  return (
    <View style={styles.latar}>
     <View>
      <View>
       <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}} 
          numColumns={3}
          columnWrapperStyle={{justifyContent:'space-between'}}
          data={daftarpreproduk}
          renderItem= {({item}) => <ListProduk item={item} />}
          keyExtractor={ daftarpreproduk => daftarpreproduk.id}
          ListHeaderComponent={ataspre}
          ListEmptyComponent={kosongpre}
          ListFooterComponent={<View style={{height:10}}></View>}
       />
      </View>
      </View>
    <Pressable style={styles.tambah}
          onPress={() => navigation.navigate('TambahPreScreen')}
          >
          <Text style={{fontSize:30, fontWeight:'bold', color: Putih}}>
          +</Text>
    </Pressable>
  </View>
  )
}

export default PreOrderScreen

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