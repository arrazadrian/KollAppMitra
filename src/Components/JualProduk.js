import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Abu, Ijo, IjoTua, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { keluarKeranjang, masukKeranjang, pilihprodukID, pilihProdukKeranjang  } from '../features/keranjangSlice'

const { width, height } = Dimensions.get('window')

const JualProduk = ({item}) => {
  const items = useSelector((state) => pilihprodukID(state, item));

  const dispatch = useDispatch();
  
  const tambahProduk = () => {
    dispatch(masukKeranjang({item}))
  };

  const buangProduk = () => {
    if(!items.length > 0) return;
    
    dispatch(keluarKeranjang({item}))
  }

  //console.log(items);

  const navigation = useNavigation();
  
  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
    })
  }


  const [quantity, setQuantity] = useState(0)
  return (
    <View>
       <View style={styles.container}>
        <Pressable onPress={pindahDetail}>
            <Image source={{uri: item.image}} style={styles.gambar}/> 
        </Pressable>
        <View>
            <Text 
            style={{fontSize:18, fontWeight:'bold'}}
            numberOfLines={1}
            >Rp{item.harga}</Text> 
            <Text
            style={{fontSize:16}}
            numberOfLines={1}
            >{item.namaproduk}</Text> 
            <Text>{item.kuantitas} {item.satuan}</Text> 
        </View>
      <View style={{flexDirection:'row', marginTop: 5, justifyContent:'space-around', alignItems:'center'}}>
        <TouchableOpacity
          style={{        
            height: width * 0.07,
            width: width * 0.07,
            borderRadius: 20,
            backgroundColor: !items.length ? (Abu) : (IjoTua),
            alignItems:'center',
            justifyContent:'center',
          }}
          disabled={!items.length}
          onPress={buangProduk}
        > 
          <Text style={styles.logoTombol}>-</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>{items.length}</Text>
        <TouchableOpacity
          style={{
            height: width * 0.07,
            width: width * 0.07,
            borderRadius: 20,
            backgroundColor: IjoTua,
            alignItems:'center',
            justifyContent:'center',
          }}
          onPress={tambahProduk}
        >
          <Text style={styles.logoTombol}>+</Text>
        </TouchableOpacity>
    </View>
       </View> 
    </View>
  )
}

export default JualProduk

const styles = StyleSheet.create({
    container: {
        backgroundColor: Putih,
        borderRadius: 10,
        borderColor: Ijo,
        borderWidth: 1,
        padding: 10,
        height: height * 0.3,
        width: width * 0.3,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    gambar: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
    },
    logoTombol:{
        color: Putih,
        fontWeight: 'bold',
        fontSize: 16,
    }
})