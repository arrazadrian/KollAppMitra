import { StyleSheet, View, Dimensions, ImageBackground, Image } from 'react-native'
import React, {useEffect} from 'react'
import { gerobaksplash, mitrasplash } from '../assets/Images/Index.js'
import { Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const SplashScreen = ({ navigation }) => {  
  useEffect(() => {
      setTimeout( () =>{
        navigation.replace('AppUtama');
      }, 3000)
  }, [navigation]);

  return (
    <View style={styles.background}>
      <Image source={mitrasplash}  style={styles.mitrasplash} />
      <Image source={gerobaksplash} style={styles.gerobaksplash} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor: Kuning,
  },
  mitrasplash:{
    alignSelf: 'center',
    top: height * 0.4,
  },
  gerobaksplash:{
    alignSelf: 'center',
    bottom: -1,
  },
})