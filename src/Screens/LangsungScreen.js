import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah } from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import Keranjang from '../Components/Keranjang'

atasjual = () => {
 
  return(
    <View style={{ paddingHorizontal: 10 }}>
    <View style={{ paddingVertical: 10 }}>
      <PencarianBar/>
    </View>
    <View>
        <View style={{marginBottom:10 }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Kategori</Text>
        </View>
        <View>
        <FlatList
            horizontal= {true}
            data={jeniskategori}
            renderItem= {({item}) => <LogoKategori item={item} />}
            keyExtractor={ jeniskategori => jeniskategori.id}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        />
        </View>
    </View>
    <View style={{marginBottom:10 }}>
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

  // const carijualproduk = (text) => {
  //   if(text){
  //     const newData = data.filter(item =>{
  //       const itemData = item.nama ? item.nama.toUpperCase() 
  //                         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilterdata(newData);
  //     setSearch(text);
  //   } else {
  //     setFilterdata(data);
  //     setSearch(text);
  //   }
  // }

  return (
    <View style={styles.latar}>
                <View>
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
                      ListHeaderComponent={atasjual}
                      ListEmptyComponent={<Text>Produk utama masih kosong</Text>}
                      ListFooterComponent={
                      <View>
                        <Image source={Bawah} style={styles.bawah}/>
                      </View>
                      }
                  />
                </View>
            
          
          <View style={{flexDirection: 'column-reverse'}}>
              <Keranjang/>
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