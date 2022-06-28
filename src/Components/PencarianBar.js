import { StyleSheet, Text, View, TextInput, Image, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { Search } from '../assets/Icons/Index'
import { KollLong } from '../assets/Images/Index'

const { width, height } = Dimensions.get('window')

const PencarianBar = () => {
  const [inputan,setInputan] = useState("")

  return (
    <View style={styles.root}>
      <Image source={KollLong} style={styles.logopojok}/>
      <TextInput 
          style={styles.container}
          placeholder='Cari produk yang anda mau'  
          value={inputan}
          onChangeText={(newText)=>{
            setInputan(newText);
          }}
          /> 
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