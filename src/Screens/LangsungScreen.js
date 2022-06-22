import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah, Kategori01, Kategori02, Kategori03, Kategori04,
        Kategori05, Kategori06, Kategori07, Kategori08,
        Kategori09, KollLong, Bag} from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
import { daftarproduk } from '../Data/daftarproduk'

headerList = () => {
  return(
    <View style={{padding: 10}}>
    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', }}>
      <Image source={KollLong} style={{width: 80, height:50}} /> 
      <PencarianBar/>
    </View>
    <View style={{marginBottom:10, marginLeft: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Kategori</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori01} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Produk Laut</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori02} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Daging</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori03} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Buah</Text>
    </Pressable>
    </View>
    <View style={{flexDirection: 'row', alignItems:'center',}}>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori04} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Sayuran</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori06} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Bahan Pokok</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori05} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Cemilan</Text>
    </Pressable>
    </View>
    <View style={{flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori07} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Lauk</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori08} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Bumbu</Text>
    </Pressable>
    <Pressable style={styles.kartu}>
      <View style={styles.belakang}>
        <Image source={Kategori09} style={styles.gambar} />
      </View>
      <Text style={styles.nama}>Frozen Food</Text>
    </Pressable>
    </View>
    <View style={{marginBottom:10, marginLeft: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Daftar Produk</Text>
    </View>
  </View>
  )
}


const LangsungScreen = ({ navigation }) => {
  
  return (
    <View style={styles.latar}>
                <View>
                  <FlatList
                      numColumns={3}
                      data={daftarproduk}
                      renderItem= {JualProduk}
                      keyExtractor={ daftarproduk => daftarproduk.id}
                      ListHeaderComponent={headerList}
                      ListEmptyComponent={<Text>Produk utama masih kosong</Text>}
                      ListFooterComponent={
                      <View>
                        <Image source={Bawah} style={styles.bawah}/>
                      </View>
                      }
                  />
                </View>
            
          
          <View style={{flexDirection: 'column-reverse'}}>
              <View style={styles.pesan}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{marginHorizontal: 10, justifyContent:'center'}}>
                      <Image source={Bag} style={{width:40, height:40}}/>
                    </View>
                    <View>
                      <Text style={{color:Putih, fontWeight:'bold'}}>
                          <Text>0 </Text>
                          <Text>Produk</Text>
                      </Text>
                      <Text style={{color:Putih, fontWeight:'bold', fontSize: 20}}>
                          <Text>Rp </Text>
                          <Text>0</Text>
                      </Text>
                    </View>
                  </View>
                  <Pressable style={{backgroundColor: IjoTua, padding: 10, borderRadius: 10}} 
                    onPress={() => navigation.navigate('CheckoutLangScreen')}
                    >
                    <Text style={{color:Putih, fontWeight:'bold', fontSize: 18}}>Checkout</Text>
                  </Pressable>
            </View>
          </View>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  panggil:{
    flexDirection: 'row',
    backgroundColor: IjoMint,
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    width: '95%',
    borderColor: Ijo,
    borderWidth: 3,
    margin: 10
  },
  gambar:{
    width: 90,
    height: 90,
  },
  belakang:{
    padding: 10, 
    backgroundColor: Putih, 
    borderRadius: 10, 
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Ijo,
  },
  kartu:{
    width: '33%',
    height: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  nama:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pesan:{
    flexDirection: 'row',
    backgroundColor: Ijo,
    alignItems:'center',
    justifyContent:'space-between',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    width: '95%',
    borderColor: IjoTua,
    borderWidth: 3,
    margin: 10
  },
  bawah:{
    width: '100%',
    height: 98,
  }  
})