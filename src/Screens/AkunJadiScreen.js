import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, {useEffect} from 'react'
import  {Akun}  from '../assets/Icons/Index.js'
import { Ijo, Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const AkunJadiScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout( () =>{
          navigation.replace('SignInScreen');
        }, 3000)
    }, [navigation]);

  return (
    <View style={styles.latar}>
      <Akun/>
      <Text style={styles.teks}>
        Akun anda telah terdaftar
      </Text>
    </View>
  )
}

export default AkunJadiScreen

const styles = StyleSheet.create({
    latar:{
        backgroundColor: Kuning,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    teks:{
        color: Ijo,
        fontSize: 24,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical: 10,
    }

})