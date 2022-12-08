import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import React, {useState} from 'react'
import { Ijo, Kuning, Putih } from '../Utils/Warna'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FrameKTP } from '../assets/Images/Index'
import { Camera, CameraType } from 'expo-camera'

const { height, width } = Dimensions.get('window')

const FotoKTPScreen = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

  return (
    <View style={{flex: 1}}>
        <Camera style={styles.kamera} type={type}>
            <Image source={FrameKTP} style={styles.framektp}/>
        </Camera>
        <Text style={styles.arahan}>Foto KTP anda dengan jelas.</Text>
        <View style={styles.bawah}>
                <TouchableOpacity style={styles.tombol}>
                    <View style={styles.lingkar}/>
                </TouchableOpacity>
                <Pressable style={styles.balik} onPress={toggleCameraType}>
                    <Ionicons name="camera-reverse" size={32} color={Putih} />
                </Pressable>
        </View>
    </View>
  )
}

export default FotoKTPScreen

const styles = StyleSheet.create({
    kamera:{
        backgroundColor: Kuning,
        height: height * 0.8,
    },
    framektp:{
        width: width,
        height: height * 0.8,
    },
    arahan:{
        position: 'absolute',
        fontSize: 16,
        color: Putih,
        top: height * 0.7,
        alignSelf:'center',
    },
    bawah:{
        position: 'absolute',
        backgroundColor: Ijo,
        width: width,
        height: height * 0.15,
        bottom: 0,
        padding: 20,
        justifyContent:'center',
        alignItems:'center',
    },
    tombol:{
        backgroundColor: Putih,
        height: width*0.2,
        width: width*0.2,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    lingkar:{
        borderColor: Ijo, 
        borderWidth: 2, 
        borderRadius: 50, 
        height: width* 0.16, 
        width: width*0.16,
    },
    balik:{
        position:'absolute',
        bottom: width * 0.1,
        right: width * 0.1,
    },
})