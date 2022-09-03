import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, {useEffect} from 'react'
import  {Check}  from '../assets/Icons/Index.js'
import { Ijo, Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const TQScreen = ({navigation}) => {

    useEffect(() => {
        setTimeout( () =>{
          navigation.replace('HomeScreen');
        }, 4000)
    }, [navigation]);

  return (
    <View style={styles.latar}>
      <View style={{marginBottom: 10}}>
        <Check/>
      </View>
      <View>
        <Text style={styles.teks}>
          Terima kasih banyak!
        </Text>
        <Text style={styles.teks}>
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
    }

})