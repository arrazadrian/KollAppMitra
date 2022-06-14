import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'


const RiwayatCard = ({ navigation }) => {
  return (
    <Pressable style={styles.card}
    onPress={() => navigation.navigate('ReceiptScreen')}
    >
      <Image source={DPkartu} style={styles.foto} />
      <View>
        <Text
        style={{fontSize:20, fontWeight:'bold', color:IjoTua}}
        >
            Sayur Aa Anri
        </Text>
        <Text style={{fontSize:18, color:Ijo}}>
            <Text>Rp</Text>
            <Text>34.000</Text>
            <Text> | </Text>
            <Text>2 </Text>
            <Text>Produk</Text>
        </Text>
      <Text>09.13, 2 Mei 2022</Text>
      <Text>ID: dahdiandkbaidbaidbai</Text>
      </View>
    </Pressable>
  )
}

export default RiwayatCard

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
    foto:{
        width: 100,
        height: 100,
        borderRadius: 20,
        margin: 10,
    }
})