import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah } from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import Keranjang from '../Components/Keranjang'

atasjual = () => {
  const [filteredData, setfilteredData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setsearch] = useState('');
  
  useEffect(() => {
    fetch(daftarproduk)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
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
                      data={filteredData}
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
            
          
          <View>
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