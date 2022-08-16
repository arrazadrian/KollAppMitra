import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bag } from '../assets/Images/Index'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { pilihProdukKeranjang, totalHarga } from '../features/keranjangSlice'

const Keranjang = () => {
  const items = useSelector(pilihProdukKeranjang)
  const navigation = useNavigation();
  const totalhargaKeranjang = useSelector(totalHarga)

  return (
    <View>
      <View style={styles.pesan}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{marginHorizontal: 10, justifyContent:'center'}}>
                      <Image source={Bag} style={{width:40, height:40}}/>
                    </View>
                    <View>
                      <Text style={{color:Putih, fontWeight:'bold'}}>
                          <Text>{items.length}</Text>
                          <Text>  </Text>
                          <Text>Produk</Text>
                      </Text>
                      <Text style={{color:Putih, fontWeight:'bold', fontSize: 20}}>
                          <Text>Rp </Text>
                          <Text>{totalhargaKeranjang}</Text>
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
  )
}

export default Keranjang

const styles = StyleSheet.create({
    pesan:{
        flexDirection: 'row',
        backgroundColor: Ijo,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        width: '95%',
        borderColor: IjoTua,
        borderWidth: 1,
        bottom:20,
      },
})