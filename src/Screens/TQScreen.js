import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, {useEffect} from 'react'
import { Ijo, Kuning } from '../Utils/Warna'
import Ionicons from '@expo/vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')

const TQScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout( () =>{
          navigation.replace('HomeScreen');
        }, 4000)
    }, []);

  return (
    <View style={styles.latar}>
      <View style={{marginBottom: 10}}>
        <Ionicons name="checkbox" size={200} color={Ijo} style={{marginHorizontal:3}}/>
      </View>
      <View>
        <Text style={styles.teks}>
          Terima kasih banyak!
        </Text>
        <Text style={styles.desk}>
          Transaksi sudah selesai
        </Text>
      </View>
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
        paddingHorizontal: 20,
    },
    teks:{
        color: Ijo,
        fontSize: 20,
        fontWeight:'bold',
        textAlign:'center',
    },
    desk:{
        color: Ijo,
        fontSize: 20,
        textAlign:'center',
  },
})