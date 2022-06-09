import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { IkanMujaer } from '../assets/Images/Index.js'

const TambahScreen = () => {
  return (
    <View style={styles.latar}>
      <ScrollView style={styles.container}>
        <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Baru</Text>
        <Text style={styles.deskripsi}>Beri detail produk sebaik mungkin</Text>
        </View>
        <View style={styles.gantifoto}>
            <Image source={IkanMujaer} style={styles.foto} />
            <Text style={styles.deskripsi}>Foto produk harus jelas</Text>
        </View>
        <Text>Nama Produk</Text>
        <TextInput style={styles.input}/>
      </ScrollView> 
    </View>
  )
}

export default TambahScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    container: {
        padding: 20,
        backgroundColor: IjoMint,
        borderRadius: 20,
    },
    judul:{
        fontSize: 20,
        fontWeight: 'bold',
        color: IjoTua,
    },
    deskripsi:{
        fontSize: 16,
        color: IjoTua,
    },
    foto:{
        backgroundColor: Putih,
        borderRadius: 20,
        height: 100,
        width: 100,
        marginRight: 10,
    },
    gantifoto:{
      marginBottom: 10, 
      flexDirection:'row',
      alignItems: 'center',
    },
    input:{
      backgroundColor: Putih,
      borderRadius: 10,
      fontSize: 16,
      padding: 10,
    }
})