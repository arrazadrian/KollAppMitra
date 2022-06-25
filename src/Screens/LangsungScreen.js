import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah, Kategori01, Kategori02, Kategori03, Kategori04,
        Kategori05, Kategori06, Kategori07, Kategori08,
        Kategori09, KollLong, Bag} from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'

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

    <FlatList
        numColumns={3}
        data={jeniskategori}
        renderItem= {({item}) => <LogoKategori item={item} />}
        keyExtractor={ jeniskategori => jeniskategori.id}
    />

    <View style={{marginBottom:10, marginLeft: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Daftar Produk</Text>
    </View>
  </View>
  )
}


const LangsungScreen = ({ navigation }) => {
  
  // const hargatotal = daftarproduk.reduce(
  //   (jumlahharga, daftarproduk) =>
  //   jumlahharga + daftarproduk.item.price * daftarproduk.quantity,
  //   0,
  // );
  const [total, setTotal] = useState(0)

  return (
    <View style={styles.latar}>
                <View>
                  <FlatList
                      numColumns={3}
                      data={daftarproduk}
                      renderItem= {({item}) => <JualProduk item={item} />}
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
                          <Text>{total}</Text>
                          <Text>  </Text>
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