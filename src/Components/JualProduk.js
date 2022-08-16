import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import QuantitySelector from './QuantitySelector'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Minus, Plus } from '../assets/Icons/Index'
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

  console.log(items);

  const navigation = useNavigation();
  
  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      namaproduk: namaproduk,
      deskproduk: deskproduk,
      image: image,
      harga: harga,
      satuan: satuan,
      kuantitas:kuantitas,
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
          disabled={!items.length}
          onPress={buangProduk}
        > 
            <Minus/>
        </TouchableOpacity>
        <Text style={{fontSize: 20}}>{items.length}</Text>
        <TouchableOpacity
          onPress={tambahProduk}
        >
            <Plus/>
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
    }
})