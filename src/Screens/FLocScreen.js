import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import { IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import MapView from 'react-native-maps'
import Garis from '../Components/Garis'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";

const FLocScreen = () => {
  return (
    <View style={styles.latar}>
      <GooglePlacesAutocomplete
          placeholder='Cari lokasi...'
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
      />
      <MapView style={styles.peta}
        initialRegion={{
          latitude: -0.803328,
          longitude: 117.908533,
          latitudeDelta: 45.19,
          longitudeDelta: 45.19,
        }}
      />
      <View style={styles.pencarian}>
        <Text style={styles.judul}>Lokasi kamu mangkal dimana?</Text>
        <Garis/>
        <TextInput 
        placeholder='Cari Lokasi...'/>
      </View>
      <Pressable style={styles.komfirmasi}>
        <Text style={{fontSize: 18, fontWeight:'bold', color: Putih}}>Komfirmasi</Text>
      </Pressable>
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
  komfirmasi:{
    position: 'absolute',
    bottom: 50,
    backgroundColor: IjoTua,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf:'center',
  }
})