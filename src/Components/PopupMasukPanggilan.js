import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ijo, IjoMint, Putih } from '../Utils/Warna';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get('window')

const PopupMasukPanggilan = () => {

    const navigation = useNavigation();
  
    const clickTerima = () => {
    //   navigation.navigate('Panggilan')
    console.log("Terima dipilih")
    }
  
    const clickTolak = () => {
    //   navigation.navigate('Panggilan')
    console.log("Tolak dipilih")
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
             <Text style={styles.pesanan}>Pesanan</Text>
             <Text style={styles.judul}>Panggilan ke Lokasi</Text>
        </View>
        <View style={{padding:10}}>
            <View style={{marginBottom: 10, padding: 10,
                }}>
                <Text style={{fontSize: 16,}}>
                    Nama Pelanggan
                </Text>
                <Text style={{fontSize: 18, color: Ijo, fontWeight:'bold'}}>
                    Azriel Hafizh
                </Text>
                <MapView style={styles.peta} 
                    initialRegion={{
                    latitude: -6.561355,
                    longitude: 106.731703,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}>
                <Marker 
                    coordinate={{
                    latitude: -6.561355,
                    longitude: 106.731703,
                    }}
                    title={"WAW"}
                    description="Lokasi Pelanggan"
                    pinColor={'tan'}
                    identifier="pelanggan"
                />
                </MapView>
                <Text style={{fontSize: 16, fontWeight: 'bold'}} numberOfLines={3}>
                    Dramaga Cantik Blok E9, Bogor, Jawa Barat.
                </Text>
                <Text style={{fontSize: 16}}>
                    100 m | 10 menit
                </Text>
            </View>
            <View style={{ flexDirection:'row', alignItems:'center', }}>
                <View style={{flex:1}}>
                    <Text style={styles.tolak} onPress={clickTolak}>Tolak</Text>
                </View>
                <TouchableOpacity style={styles.tombol}>
                     <Text style={styles.terima}
                     onPress={clickTerima}
                     >Terima</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default PopupMasukPanggilan

const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        position: 'absolute',
        width: width * 0.9,
       // height: height * 0.5,
        borderRadius: 20,
        backgroundColor: Putih,
        elevation: 5,
        marginHorizontal: 20,
        marginTop: height * 0.1,
        borderColor: Ijo,
        borderWidth: 2,
    },
    header:{
        padding: 10,
        backgroundColor: Ijo,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    judul:{
        color: Putih,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center',
    },
    pesanan:{
        color: Putih,
        fontSize: 16,
        textAlign:'center',
    },
    peta:{
        width: '100%',
        height: height * 0.3,
        marginVertical: 10,
    },
    tolak:{
        color: Ijo,
        fontSize: 18,
        textAlign:'center',
        fontWeight:'bold',
    },
    terima:{
        color: Putih,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
    },
    tombol:{
        flex: 1,
        backgroundColor:Ijo,
        padding: 10,
        borderRadius: 10,
    }
})