import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
   IconAkunIjo, IconAkunPutih,
   IconHomeIjo, IconHomePutih,
   IconRiwayatIjo, IconRiwayatPutih
} from '../assets/Icons/Index'
import { IjoTua, Putih } from '../Utils/Warna';
import { useSelector } from 'react-redux';


const TabItem = ({ isFocused, onPress, onLongPress, label}) => {
  const Icon = () => { 
    if(label === "Beranda") return isFocused ? <IconHomePutih/> : <IconHomeIjo/>
    if(label === "Pesanan") return isFocused ? <IconRiwayatPutih/> : <IconRiwayatIjo/>
    if(label === "Akun") return isFocused ? <IconAkunPutih/> : <IconAkunIjo/>
  }

  const { aktif } = useSelector(state => state.counter);

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
            { ((label === "Pesanan") && (aktif > 0))  &&
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{aktif}</Text>
              </View>
            }
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
  container:{
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  badge:{
    position:'absolute',
    backgroundColor:'tomato',
    right: 5,
    bottom: 40,
    borderRadius: 10,
    height: 18,
    width: 18,
    justifyContent:'center',
    alignItems:'center',
  },
  badgeText:{
    fontSize: 10,
    color: Putih,
    textAlign:'center',
    fontWeight:'bold',
  },
});