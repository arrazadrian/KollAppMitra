import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import MapView, { Marker, Circle } from 'react-native-maps'
import Garis from '../Components/Garis'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { updateMangkal } from '../features/mangkalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const FLocScreen = () => {

  const navigation = useNavigation();

  const { geo, alamat } = useSelector(state => state.mangkal);
  const geofire = require('geofire-common');

  const dispatch = useDispatch();

  const [show, setShow] = useState(false)

  const [pin,setPin] = useState ({
    latitude: geo?.lat || -6.561355,
    longitude: geo?.lng || 106.731703,
    latitudeDelta: 12.05, 
    longitudeDelta: 12.05,
  });

  const [region,setRegion] = useState ({
    latitude: geo?.lat || -6.561355,
    longitude: geo?.lng || 106.731703,
    latitudeDelta: 12.05, 
    longitudeDelta: 12.05,
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
          latitudeDelta: 0.02, 
          longitudeDelta: 0.02,
        }}
      >
        { (geo?.lat || show) &&
          <Marker 
            coordinate={{latitude: pin?.latitude, longitude: pin?.longitude}}
            // draggable={true}
            // onDragStart={(data, details=null) => {
            //    console.log('mulai')
            // }}
            // onDragEnd={
            //   e => console.log(e.nativeEvent)
              // (data, details=null) => {
              // console.log(data, details)
              // setRegion({
              //   latitude: coordinate.latitude,
              //   longitude: coordinate.longitude,
              //   latitudeDelta: 0.01, 
              //   longitudeDelta: 0.01,
              // })
              // setPin({
              //   latitude: coordinate.latitude,
              //   longitude: coordinate.longitude,
              //   latitudeDelta: 0.01, 
              //   longitudeDelta: 0.01,
              // })
              // dispatch(updateMangkal({
              //   geo: details.geometry.location,
              //   alamat: data.description,
              //   geohash: geofire.geohashForLocation([coordinate.latitude,coordinate.longitude])
              // }))
              //  }
              //}
              />
        }
        <Circle 
            center={{latitude: pin?.latitude, longitude: pin?.longitude}}
            radius={1000}
            strokeWidth={1}
            strokeColor={Ijo}
            fillColor={'rgba(201,227,172,0.5)'}
        />

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
            minLength={5}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
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
        <View style={styles.bawah}>
            <View style={styles.kotak}>
              <Text style={[styles.alamatjelas, {fontWeight: 'normal'}]}>Lokasi Mangkal</Text>
              <Text style={styles.alamatjelas}>{alamat}</Text>
              <Text style={[styles.alamatjelas, {fontWeight: 'normal', fontSize: 12, fontStyle:'italic'}]}>Catatan: Lingkaran menampilkan area pelanggan</Text>
            </View> 
            <Pressable style={styles.komfirmasi} onPress={() => navigation.goBack()}>
              <Text style={{fontSize: 18, fontWeight:'bold', color: Putih, textAlign:'center'}}>Kembali</Text>
            </Pressable>
        </View>
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
  alamatjelas:{
    color: IjoTua,
    fontSize: 14,
    fontWeight:'bold',
    textAlign: 'center',
  },
  kotak:{
    padding: 10,
    backgroundColor: IjoMint,
    marginBottom: 20,
    borderRadius: 10,
    width: width * 0.9,
  },
  komfirmasi:{
    backgroundColor: IjoTua,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bawah:{
    position: 'absolute',
    bottom: 50,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
})