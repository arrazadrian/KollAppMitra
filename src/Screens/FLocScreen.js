import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import MapView from 'react-native-maps'
import Garis from '../Components/Garis'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { updateMangkal } from '../features/mangkalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const FLocScreen = () => {

  const navigation = useNavigation();

  const { lok_mangkal } = useSelector(state => state.mangkal);
  const dispatch = useDispatch();

  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}
        initialRegion={{
          latitude: -6.561355,
          longitude: 106.731703,
          latitudeDelta: 0.01, 
          longitudeDelta: 0.01,
        }}
      />
      <View style={styles.pencarian}>
          <Text style={styles.judul}>Lokasi kamu mangkal dimana?</Text>
          <Garis/>
          <GooglePlacesAutocomplete
            placeholder='Cari lokasi mangkal...'
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en'
            }}
            enablePoweredByContainer={false}
            minLength={3}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onPress={(data, details = null) => {
              dispatch(updateMangkal({
                location: details.geometry.location,
                description: data.description
              }))
            }}
          />
      </View>
      { lok_mangkal && 
        <Pressable style={styles.komfirmasi} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 18, fontWeight:'bold', color: Putih}}>Komfirmasi</Text>
        </Pressable>
      }
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
    paddingLeft: 10,
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