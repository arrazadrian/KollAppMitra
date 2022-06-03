import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
   IconAkunIjo, IconAkunPutih,
   IconHomeIjo, IconHomePutih,
   IconRiwayatIjo, IconRiwayatPutih
} from '../assets/Icons/Index'

import { IjoTua, Putih } from '../Utils/Warna'

const TabItem = ({ isFocused, onPress, onLongPress, label}) => {
  const Icon = () => { 
    if(label === "Beranda") return isFocused ? <IconHomePutih/> : <IconHomeIjo/>
    if(label === "Riwayat") return isFocused ? <IconRiwayatPutih/> : <IconRiwayatIjo/>
    if(label === "Akun") return isFocused ? <IconAkunPutih/> : <IconAkunIjo/>
  }
  return (
    <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon style={{
               height: 15,
               width: 15
            }}/>
            <Text style={{ 
              fontSize: 14,
              color: isFocused ? Putih : IjoTua,
              marginTop: 6}}>
            {label}
            </Text>
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
  container:{
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
});