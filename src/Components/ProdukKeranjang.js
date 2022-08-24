import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ijo, IjoTua, Putih } from '../Utils/Warna'
import { DPdefault } from '../assets/Images/Index'


const { width, height } = Dimensions.get('window')

const ProdukKeranjang = ({items}) => {
  return (
    <View style={styles.card}>
        <View style={{flexDirection:'row', alignItems:'center', marginRight:25}}>
            <Image source={{uri: image}} style={styles.foto}/>
            <View>
                <Text style={styles.produk} numberOfLines={1}>{namaproduk}</Text>
                <Text style={styles.harga}>Rp{harga}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', marginTop: 5, alignItems:'center'}}>
            <TouchableOpacity
                style={{
                    height: width * 0.07,
                    width: width * 0.07,
                    borderRadius: 20,
                    backgroundColor: IjoTua,
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <Text style={styles.logoTombol}>-</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20, marginHorizontal: 15}}>{items.length}</Text>
            <TouchableOpacity
                style={{
                    height: width * 0.07,
                    width: width * 0.07,
                    borderRadius: 20,
                    backgroundColor: IjoTua,
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <Text style={styles.logoTombol}>+</Text>
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
    logoTombol:{
        color: Putih,
        fontWeight: 'bold',
        fontSize: 16,
    }
})