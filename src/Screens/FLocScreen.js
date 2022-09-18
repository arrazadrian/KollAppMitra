import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { IjoTua, Kuning, Putih } from '../Utils/Warna'
import MapView from 'react-native-maps'
import Garis from '../Components/Garis'

const FLocScreen = () => {
  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}/>
      <View style={styles.pencarian}>
        <Text style={styles.judul}>Lokasi kamu mangkal dimana?</Text>
        <Garis/>
        <TextInput 
        placeholder='Cari Lokasi...'/>
      </View>
    </View>
  )
}

export default FLocScreen

const styles = StyleSheet.create({
  latar:{
    backgroundColor: Kuning,
    flex: 1,
  },
  pencarian:{
    position:'absolute',
    backgroundColor: Putih,
    borderRadius: 10,
    width: '95%',
    margin: 10,
    padding: 10,
    alignSelf:'center',
  },
  judul:{
    fontSize: 18,
    fontWeight: 'bold',
    color: IjoTua,
  },
  peta:{
    width: '100%',
    height: '100%',
  },
})