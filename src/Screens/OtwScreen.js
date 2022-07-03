import { Image, StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'
import { useNavigation } from '@react-navigation/native'

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
          Sudah sampai? Yuk lanjut belanja
        </Text>
      </Pressable>
      <View style={styles.bungkus}>
          <Image source={DPkartu} style={styles.foto} />
          <View>
          <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}}>
            Sayur Aa Anri
            </Text>
          <Text style={{color: Ijo}}>Menuju lokasi pelanggan</Text>
          <View style={{flexDirection:'row'}}>
          <Image source={Call} style={styles.icon} />
          <Image source={Chat} style={styles.icon} />
          </View>
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
    flex:4,
},
bungkus:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: Kuning,
},
foto:{
    width: 100,
    height: 100,
    borderRadius: 20,
    margin: 10,
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
})