import { StyleSheet, View, Dimensions, ImageBackground, Image } from 'react-native'
import React, {useEffect} from 'react'
import { gerobaksplash, mitrasplash } from '../assets/Images/Index.js'
import { Kuning } from '../Utils/Warna'

const { height, width } = Dimensions.get('window')

const SplashScreen = ({ navigation }) => {  
  useEffect(() => {
      setTimeout( () =>{
        navigation.replace('Gerbang');
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
    position: 'absolute',
    alignSelf: 'center',
    top: height * 0.35,
    width: width* 0.4,
    height: width* 0.4,
  },
  gerobaksplash:{
    position:'absolute',
    alignSelf: 'center',
    bottom: -1,
    width: width,
    height: height * 0.3,
  },
})