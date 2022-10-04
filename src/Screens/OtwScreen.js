import { Image, StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'
import { useNavigation } from '@react-navigation/native'
import GarisBatas from '../Components/GarisBatas'

const { width, height } = Dimensions.get('window')

const OtwScreen = () => {

  const navigation = useNavigation();

  const clickLanjut = () => {
    navigation.navigate('LanjutBelanjaScreen')
  }

  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}/>
      <Pressable style={styles.lanjut}
        onPress={clickLanjut}
      >
        <Text style={styles.tekslanjut}>
          Sudah Sampai Lokasi
        </Text>
      </Pressable>
      <View style={styles.bungkus}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View>
              <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}}>
                Sayur Aa Anri
                </Text>
              <View style={{flexDirection:'row'}}>
                  <Image source={Call} style={styles.icon} />
                  <Image source={Chat} style={styles.icon} />
              </View>
            </View>
            <Image source={DPkartu} style={styles.foto} />
          </View>
          <GarisBatas/>
          <View style={{marginBottom: 10,}}>
            <Text style={{color: IjoTua, fontWeight:'bold', fontSize: 16}}>Tujuan Lokasi</Text>
            <Text numberOfLines={3}>Jl. Semoga overflow banyak yg sehat sekeluarga dan dilapangkan rizekinya sampai tua nanti aicusuas coashcasohacs acsuhuaihasch acoboaoabsasobca</Text>
          </View>
          <View style={styles.catatan}>
            <Text style={{color: IjoTua, fontWeight:'bold', fontSize: 16}}>Catatan Lokasi</Text>
            <Text style={{fontStyle:'italic'}} numberOfLines={1}>Jl. Semoga overflow banyak yg sehat sekeluarga dan dilapangkan rizekinya sampai tua nanti aicusuas coashcasohacs acsuhuaihasch acoboaoabsasobca</Text>
          </View>
      </View>
    </View>
  )
}

export default OtwScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
},
peta:{
    width: width,
    height: height * 0.5,
},
bungkus:{
    width: width,
    height: height * 0.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 19,
    padding: 10,
    backgroundColor: Kuning,
    position:'absolute',
    bottom: 0,
},
foto:{
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
},
icon:{
    width: 40,
    height: 40,
    marginVertical: 5,
    marginRight:20,
},
lanjut:{
  backgroundColor: IjoMint,
  padding: 10,
  justifyContent:'center',
  alignItems: 'center',
  position:'absolute',
  alignSelf:'center',
  top: height * 0.02,
  borderRadius: 10,
  borderColor: Ijo,
  borderWidth: 2,
  elevation: 5,
},
tekslanjut:{
  fontSize: 18,
  fontWeight: 'bold',
  color: Ijo,
},
catatan:{
  backgroundColor:Putih,
  borderWidth: 1,
  borderRadius: 10,
  padding: 10,
  elevation: 5,
},
})