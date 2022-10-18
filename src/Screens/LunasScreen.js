import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ijo, IjoMint, Kuning } from '../Utils/Warna';
import { IconHomeIjo } from '../assets/Icons/Index';
import CardKasbon from '../Components/KasbonCard';


const LunasScreen = ({navigation}) => {
  return (
    <View style={styles.latar}>
      <CardKasbon/>
      <TouchableOpacity style={styles.kembali} onPress={() => navigation.navigate('HomeScreen')}>
            <IconHomeIjo/>
      </TouchableOpacity>
    </View>
  )
}

export default LunasScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    kembali:{
        position:'absolute',
        backgroundColor: IjoMint,
        borderRadius: 20,
        padding: 10,
        bottom: 40,
        alignSelf: 'center',
    },
})