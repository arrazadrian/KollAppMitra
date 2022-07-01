import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { Ijo, IjoTua, Kuning } from '../Utils/Warna'
import { DPkartu } from '../assets/Images/Index'
import { Call, Chat } from '../assets/Icons/Index'

const OtwScreen = () => {
  return (
    <View style={styles.latar}>
      <MapView style={styles.peta}/>
      <View style={styles.bungkus}>
          <Image source={DPkartu} style={styles.foto} />
          <View>
          <Text style={{fontSize:20, fontWeight:'bold', color:IjoTua}}>
            Sayur Aa Anri
            </Text>
          <Text style={{color: Ijo}}>Sedang menuju lokasi</Text>
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
    backgroundColor: Kuning,
},
peta:{
    width: '100%',
    height: '75%',
},
bungkus:{
    width: '100%',
    height: '25%',
    padding: 10,
    flexDirection: 'row',
    alignItems:'center'

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
}
})