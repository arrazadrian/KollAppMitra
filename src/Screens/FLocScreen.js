import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import MapView, { Marker } from 'react-native-maps'
import Garis from '../Components/Garis'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { updateMangkal } from '../features/mangkalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


const FLocScreen = () => {

  const navigation = useNavigation();

  const { geo, alamat } = useSelector(state => state.mangkal);
  const geofire = require('geofire-common');

  const dispatch = useDispatch();

  const [show, setShow] = useState(false)

  const [pin,setPin] = useState ({
    latitude: geo?.lat || -6.561355,
    longitude: geo?.lng || 106.731703,
    latitudeDelta: 0.005, 
    longitudeDelta: 0.005,
  });

  const [region,setRegion] = useState ({
    latitude: geo?.lat || -6.561355,
    longitude: geo?.lng || 106.731703,
    latitudeDelta: 0.005, 
    longitudeDelta: 0.005,
  });
  
  const awal = {
    lat: -6.561355,
    lng: 106.731703,
  }

  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.005, 
          longitudeDelta: 0.005,
        }}
      >
        { (geo?.lat || show) &&
          <Marker coordinate={{latitude: pin?.latitude, longitude: pin?.longitude}}/>
        }

      </MapView>

      <View style={styles.pencarian}>
          <Text style={styles.judul}>Lokasi kamu mangkal dimana?</Text>
          <Garis/>
          <GooglePlacesAutocomplete
            placeholder='Cari lokasi mangkal...'
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance"
            }}
            styles={{
              container: { flex: 0, width:"100%", zIndex: 1 },
              textInput:{fontSize: 16},
              listView: {backgroundColor:'white'}
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'id',
              components: "country:id",
              radius: 25 * 1000,
              location: `${awal.lat},${awal.lng}`
            }}
            enablePoweredByContainer={false}
            minLength={3}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onPress={(data, details=null) => {
              // console.log(data, details)
              setShow(true)
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.01, 
                longitudeDelta: 0.01,
              })
              setPin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.01, 
                longitudeDelta: 0.01,
              })
              dispatch(updateMangkal({
                geo: details.geometry.location,
                alamat: data.description,
                geohash: geofire.geohashForLocation([details.geometry.location.lat,details.geometry.location.lng])
              }))
            }}
          />
      </View>
      { alamat && 
        <Pressable style={styles.komfirmasi} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 18, fontWeight:'bold', color: Putih}}>Kembali</Text>
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