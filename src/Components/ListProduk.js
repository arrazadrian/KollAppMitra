import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer, Tomato } from '../assets/Images/Index'
import { Edit } from '../assets/Icons/Index'


const ListProduk = ({item}) => {
  return (
    <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom:80}}>
       <View style={styles.container}>
          <Image source={item.image} style={styles.gambar} />
          <View>
              <Text style={{fontSize:18, fontWeight:'bold'}}>Rp{item.harga}</Text> 
              <Text>{item.nama}</Text> 
              <Text>{item.kuantitas}{item.satuan}</Text> 
          </View>
          <Edit style={{left: 30}}/>
       </View> 
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
        width: 120,
        marginHorizontal: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    gambar: {
        width: 90,
        height: 90,
        borderRadius: 10,
    }
})