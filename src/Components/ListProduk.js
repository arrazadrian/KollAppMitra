import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { Edit } from '../assets/Icons/Index'
import { useNavigation } from '@react-navigation/native'


const ListProduk = ({item}) => {
  
  const navigation = useNavigation();

  const pindahDetail = () => {
    navigation.navigate('DetailScreen', { 
      nama: item.nama,
      deskripsi: item.deskripsi,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
    })
  }

  const pindahEdit = () => {
    navigation.navigate('EditProdukScreen', { 
      nama: item.nama,
      deskripsi: item.deskripsi,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas, 
      kategori: item.kategori, 
    })
  }

  return (
    <View>
       <Pressable 
       onPress={pindahDetail}
       style={styles.container}>
          <Image source={item.image} style={styles.gambar} />
          <View>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{item.harga}</Text> 
              <Text 
              style={{fontSize:16}}
              numberOfLines={1}
              >{item.nama}</Text> 
              <Text>{item.kuantitas}{item.satuan}</Text> 
          </View>
          <View style={{position:'absolute', right:10, bottom:10}}>
            <Pressable 
            onPress={pindahEdit}>
              <Edit/>
            </Pressable>
          </View>
       </Pressable> 
    </View>
  )
}

export default ListProduk

const styles = StyleSheet.create({
    container: {
        backgroundColor: Putih,
        borderRadius: 10,
        borderColor: Ijo,
        borderWidth: 1,
        padding: 10,
        height: 200,
        width: 100,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    gambar: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignSelf: 'center',
    },
})