import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, {useEffect} from 'react'
import  {Check}  from '../assets/Icons/Index.js'
import { Ijo, Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const TQScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout( () =>{
          navigation.replace('HomeScreen');
        }, 3000)
    }, [navigation]);

  return (
    <View style={styles.latar}>
      <Check/>
      <Text style={styles.teks}>
        Terima kasih banyak! Transaksi sudah selesai
      </Text>
    </View>
  )
}

export default TQScreen

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