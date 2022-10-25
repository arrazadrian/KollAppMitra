import { StyleSheet, Text, View, Image, Pressable, Dimensions} from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { Edit } from '../assets/Icons/Index'
import { useNavigation } from '@react-navigation/native'
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')

const ListProduk = ({item}) => {
  
  const navigation = useNavigation();
  
  const pindahDetail = () => {
    //console.log(item.id)
    navigation.navigate('DetailScreen', { 
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas,
      tersedia: item.tersedia,
    })
  }
  
  const pindahEdit = () => {
    navigation.navigate('EditProdukScreen', { 
      produkid: item.id,
      namaproduk: item.namaproduk,
      deskproduk: item.deskproduk,
      image: item.image,
      harga: item.harga,
      satuan: item.satuan,
      kuantitas: item.kuantitas, 
      kategori: item.kategori,
      tersedia: item.tersedia, 
    })
  }
    
  return (
    <View>
      {item.tersedia ?
      (
       <View
       style={styles.container}>
          <Pressable onPress={pindahDetail}>
              <Image source={{uri:item.image}} style={styles.gambar} />
          </Pressable>
          <View>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{new Intl.NumberFormat('id-Id').format(item.harga).toString()}</Text> 
              <Text 
              style={{fontSize:16}}
              numberOfLines={1}
              >{item.namaproduk}</Text> 
              <Text>{item.kuantitas} {item.satuan}</Text> 
          </View>
          <View style={{position:'absolute', right:10, bottom:10}}>
            <Pressable 
            onPress={pindahEdit}>
              <Edit/>
            </Pressable>
          </View>
       </View> 
      ):(
       <View
       style={styles.container}>
          <Pressable onPress={pindahDetail}>
              <Text style={styles.habis}>Stok Habis</Text>
              <Image source={{uri:item.image}} style={styles.gambarhabis} />
          </Pressable>
          <View>
              <Text 
              style={{fontSize:18, fontWeight:'bold'}}
              numberOfLines={1}
              >Rp{new Intl.NumberFormat('id-Id').format(item.harga).toString()}</Text> 
              <Text 
              style={{fontSize:16}}
              numberOfLines={1}
              >{item.namaproduk}</Text> 
              <Text>{item.kuantitas} {item.satuan}</Text> 
          </View>
          <View style={{position:'absolute', right:10, bottom:10}}>
            <Pressable 
            onPress={pindahEdit}>
              <Edit/>
            </Pressable>
          </View>
       </View> 
      )}
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
    gambarhabis: {
        width:  height * 0.13,
        height: height * 0.13,
        borderRadius: 10,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginBottom: 10,
        opacity: 0.3,
    },
    habis:{
        position:'absolute',
        fontSize: 12,
        fontWeight: 'bold',
        color: 'tomato',
        textAlign: 'center',
        top: width * 0.1,
        left:  width * 0.04,
    },
})