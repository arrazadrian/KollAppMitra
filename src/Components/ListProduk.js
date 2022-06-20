import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ijo, Putih } from '../Utils/Warna'
import { IkanMujaer, Tomato } from '../assets/Images/Index'
import { Edit } from '../assets/Icons/Index'



const ListProduk = (props) => {
  return (
    <View>
       <View style={styles.container}>
          <Image source={Tomato} style={styles.gambar} />
          <View>
              <Text style={{fontSize:18, fontWeight:'bold'}}>Rp25.000</Text> 
              <Text>Ikan Mujaer</Text> 
              <Text>250g</Text> 
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