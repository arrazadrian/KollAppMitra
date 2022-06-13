import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Minus, Plus } from '../assets/Icons/Index'
import { Ijo, Putih } from '../Utils/Warna'
import { Tomato } from '../assets/Images/Index'

const JualProduk = () => {
  return (
    <View>
       <View style={styles.container}>
        <View style={{alignItems:'center'}}>
            <Image source={Tomato} style={styles.gambar} />
            <View>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Rp25.000</Text> 
                <Text>Ikan Mujaer</Text> 
                <Text>250g</Text> 
            </View>
        </View>
          <View style={{flexDirection:'row', marginTop: 5, justifyContent:'space-around', alignItems:'center'}}>
            <Pressable>
                <Plus/>
            </Pressable>
            <Text style={{fontSize: 20}}>0</Text>
            <Pressable>
                <Minus/>
            </Pressable>
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
        //height: 200,
        //width: 120,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    gambar: {
        width: 90,
        height: 90,
        borderRadius: 10,
    }
})