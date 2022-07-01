import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Ijo, IjoMint, Putih } from '../Utils/Warna'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const PopupMasukPanggilan = () => {

    const navigation = useNavigation();
  
    const clickTerima = () => {
      navigation.navigate('Panggilan')
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
             <Text style={styles.pesanan}>Pesanan</Text>
             <Text style={styles.judul}>Panggilan ke Lokasi</Text>
        </View>
        <View style={{padding:10}}>
            <View style={{
                marginBottom: 10,
                padding: 10,
                }}>
                <Text style={{fontSize: 20,}}
                >
                    Azriel Hafizh
                </Text>
                <Text 
                style={{fontSize: 20, fontWeight: 'bold'}}
                numberOfLines={3}
                >
                    Dramaga Cantik Blok E9, Bogor, Jawa Barat.
                </Text>
                <Text style={{fontSize: 22}}
                >
                    100 m | 10 menit
                </Text>
            </View>
            <View style={{
                flexDirection:'row', 
                alignItems:'center',
                
                }}>
                <View style={{flex:1}}>
                    <Text style={styles.tolak}>Tolak</Text>
                </View>
                <View style={styles.tombol}>
                     <Text style={styles.terima}
                     onPress={clickTerima}
                     >Terima</Text>
                </View>
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
        marginTop: height * 0.3,
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
        fontSize: 20,
        textAlign:'center',
    },
    pesanan:{
        color: Putih,
        fontSize: 18,
        textAlign:'center',
    },
    tolak:{
        color: Ijo,
        fontSize: 18,
        textAlign:'center',
    },
    terima:{
        color: Ijo,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
    },
    tombol:{
        flex: 1,
        backgroundColor:IjoMint,
        padding: 10,
        borderRadius: 10,
    }
})