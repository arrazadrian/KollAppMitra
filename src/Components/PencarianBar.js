import { StyleSheet, Text, View, TextInput, Image} from 'react-native'
import React from 'react'
import { Search } from '../assets/Icons/Index'

const PencarianBar = () => {
  return (
    <View style={{flexDirection: 'row', alignItems:'center'}}>
      <TextInput placeholder='Cari produk yang anda inginkan'  style={styles.container}> 
        
      </TextInput>
      <Search style={{position: 'absolute', top: 10, left: 18 }} />
    </View>
  )
}

export default PencarianBar

const styles = StyleSheet.create({
  container:{
    position: 'relative',
    height: 40, 
    width: 290,
    backgroundColor: '#fff',
    fontSize: 15,
    borderRadius: 10,
    paddingLeft: 35,
    paddingRight: 10,
    paddingStart: 35,
    paddingEnd: 10,
    marginLeft: 10,
    marginRight: 20

  }
})