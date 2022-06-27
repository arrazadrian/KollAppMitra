import { StyleSheet, Text, View, TextInput, Image, Dimensions} from 'react-native'
import React from 'react'
import { Search } from '../assets/Icons/Index'
import { KollLong } from '../assets/Images/Index'

const { width, height } = Dimensions.get('window')

const PencarianBar = () => {
  return (
    <View style={styles.root}>
      <Image source={KollLong} style={styles.logopojok}/>
      <TextInput placeholder='Cari produk yang anda mau'  style={styles.container}/> 
      <Search style={{position: 'absolute', top: width*0.024, left: width*0.24}} />
    </View>
  )
}

export default PencarianBar

const styles = StyleSheet.create({
  root:{
    flexDirection:'row',
    alignItems: 'center',
    width:'100%',
    height: 40,
  },
  container:{
    flex: 3,
    position: 'relative',
    height: 40,
    backgroundColor: '#fff',
    fontSize: 15,
    borderRadius: 10,
    paddingLeft: 35,
    paddingRight: 10,
    paddingStart: 35,
    paddingEnd: 10,
    marginLeft: 5,
  },
  logopojok:{
    width: '25%',
    height: 30,
    flex: 1,
  },
})