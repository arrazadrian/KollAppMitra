import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import { daftarproduk } from '../Data/daftarproduk'
import Keranjang from '../Components/Keranjang'
import ProdukKosong from '../Components/ProdukKosong'
import JualProduk from '../Components/JualProduk'
import PencarianBar from '../Components/PencarianBar'

const { width, height } = Dimensions.get('window')

const kosongkategori = () => {
   return(
   <View style={{alignItems:'center', paddingBottom:40}}>
     <ProdukKosong/>
     <Text style={{
       fontSize: 16, color: IjoTua, textAlign:'center',
       width: width*0.8,
     }}>
       Kamu tidak punya produk utama dengan kategori ini.
     </Text>
   </View>
   )
 }

 const atasKategori = () => {
   return(
      <View style={{padding: 10}}>
         <Text style={styles.judul}>
            Daftar produk kategori...
         </Text>
      </View>
   )
 }

const KategoriScreen = () => {
  return (
   <View style={styles.latar}>
      <View style={{padding: 10}}>
         <PencarianBar/>
      </View>
    <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:'space-between',
          paddingHorizontal: 10,
        }}
        data={daftarproduk}
        renderItem= {({item}) => <JualProduk item={item} />}
        keyExtractor={ daftarproduk => daftarproduk.id}
        ListEmptyComponent={kosongkategori}
        ListHeaderComponent={atasKategori}
        ListFooterComponent={<View style={{height:height*0.12}}></View>}
    />
    <Keranjang/>
   </View>
  )
}

export default KategoriScreen

const styles = StyleSheet.create({
   latar:{
      backgroundColor: Kuning,
      flex: 1,
   },
   judul:{
      fontSize: 20,
      color: Ijo,
      fontWeight: 'bold',
   }

})