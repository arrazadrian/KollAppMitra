import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable, Modal } from 'react-native'
import React, {useState} from 'react'
import { Ijo, Kuning, Putih } from '../Utils/Warna'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Distord_diri, FrameDiri } from '../assets/Images/Index'
import { Camera, CameraType } from 'expo-camera'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { updateDiri } from '../features/ktpSlice'


const { height, width } = Dimensions.get('window')

const FotoDiriKTPScreen = () => {
    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);

    const [modalVisible, setModalVisible] = useState(true);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            await dispatch(updateDiri({foto_diri: data.uri}));
            console.log(data.uri);
            navigation.goBack();
        }
    };

  return (
    <View style={{flex: 1}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                swipeDirection = "down"
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Contoh foto diri bersama KTP</Text>
                        <Image source={Distord_diri} style={styles.contoh}/>
                        <Text style={{color: Ijo, fontWeight:'bold'}} onPress={() => { setModalVisible(!modalVisible) }}>
                            Tutup
                        </Text>
                    </View>
                </View>
            </Modal>
        <Camera style={styles.kamera} type={type}  ref={(ref) => setCamera(ref)}>
            <Image source={FrameDiri} style={styles.framektp}/>
        </Camera>
        <Text style={styles.arahan}>Foto diri anda dengan jelas.</Text>
        <View style={styles.bawah}>
            <Pressable onPress={() => {setModalVisible(true)}}>
                <Ionicons name="help-circle" size={32} color={Putih} />
            </Pressable>
            <TouchableOpacity style={styles.tombol} onPress={takePicture}>
                <View style={styles.lingkar}/>
            </TouchableOpacity>
            <Pressable onPress={toggleCameraType}>
                <Ionicons name="camera-reverse" size={32} color={Putih} />
            </Pressable>
        </View>
    </View>
  )
}

export default FotoDiriKTPScreen

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
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        },
    contoh:{
        width: width * 0.6,
        height: width * 0.8,
        borderRadius: 10,
        marginVertical: 10,
    },
})