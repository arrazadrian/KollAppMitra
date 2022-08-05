import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { DPdefault } from '../assets/Images/Index'
import { Minus, Plus } from '../assets/Icons/Index'


const { width, height } = Dimensions.get('window')

const ProdukKeranjang = () => {
  return (
    <View style={styles.card}>
        <View style={{flexDirection:'row', alignItems:'center', marginRight:25}}>
            <Image source={DPdefault} style={styles.foto}/>
            <View>
                <Text style={styles.produk} numberOfLines={1}>Bawang Merah</Text>
                <Text style={styles.harga}>Rp43000</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', marginTop: 5, alignItems:'center'}}>
            <TouchableOpacity> 
                <Minus/>
            </TouchableOpacity>
            <Text style={{fontSize: 20, marginHorizontal: 15}}>4</Text>
            <TouchableOpacity>
                <Plus/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProdukKeranjang

const styles = StyleSheet.create({
    card:{
        backgroundColor: Putih,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
        marginVertical: 4,
    },
    foto:{
        width: width * 0.2,
        height: width * 0.2,
        borderColor: Ijo,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
    },
    produk:{
        fontSize: 16,
        width: width * 0.3,
    },
    harga:{
        fontSize: 18,
        fontWeight:'bold',
    },
})