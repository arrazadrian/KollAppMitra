import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah } from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import Keranjang from '../Components/Keranjang'
import ProdukKosong from '../Components/ProdukKosong'


const { width, height } = Dimensions.get('window')

const kosongproduk = () => {
  return(
  <View style={{alignItems:'center', paddingBottom:40}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk utama. Kembali ke beranda dan 
      ketuk bagian produk utama unuk membuatnya.
    </Text>
  </View>
  )
}

const atasjual = () => {
  
  // useEffect(() => {
  //   fetch(daftarproduk)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setFilteredDataSource(responseJson);
  //       setMasterDataSource(responseJson);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return(
    <View style={{ paddingHorizontal: 10 }}>

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
  
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');

  const searchFilter = (text) =>{
    if (text) {
      const newData = masterData.filter((item) =>{
        const itemData = item.nama ? item.nama.toUpperCase()
                      : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  }

  // // Cara ngefilter
  // let filter = daftarproduk.filter((item) => item.kategori === 'Frozen Food')

  return (
    <View style={styles.latar}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
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
                ListHeaderComponent={atasjual}
                ListEmptyComponent={kosongproduk}
                ListFooterComponent={
                <View>
                  <Image source={Bawah} style={styles.bawah}/>
                </View>
                }
            />
            <Keranjang/>
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex: 5,
    backgroundColor: Kuning,
  },
  bawah:{
    marginTop: 80,
    flex: 1,
    width: '100%',
    height: height*0.15,
  },  
})