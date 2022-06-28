import { StyleSheet, Text, View, Image, Pressable, Dimensions} from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { Edit } from '../assets/Icons/Index'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

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
          <View>
              <Image source={item.image} style={styles.gambar} />
          </View>
          <View>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{item.harga}</Text> 
              <Text 
              style={{fontSize:16}}
              numberOfLines={1}
              >{item.nama}</Text> 
              <Text>{item.kuantitas} {item.satuan}</Text> 
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
        height: height * 0.3,
        width: width * 0.3,
        marginBottom: 10,
    },
    gambar: {
        width:  height * 0.13,
        height: height * 0.13,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginBottom: 10,
    },
})