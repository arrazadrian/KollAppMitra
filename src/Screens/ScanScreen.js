import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna';
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { update } from '../features/pelangganSlice';


const { width, height } = Dimensions.get('window')

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [hasilscan, setHasilscan] = useState();
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const getBarCodeScannerPermissions = async () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    };
    
    useEffect(() => {
        getBarCodeScannerPermissions();
    }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(data + ' di tempat SCAN')
        setHasilscan(data)
        if(hasilscan != null){
          dispatch(update({hasilscan}));
          console.log(hasilscan + 'ini masuk if')
          navigation.goBack();
        } else {
          console.log('Gagal nih ga masuk redux')
        }
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return( 
        <View>
            <Text>Tidak punya akses ke kamera</Text>
            <Pressable style={styles.izin}
                onPress={() => getBarCodeScannerPermissions()}
            >
                <Text>Izinkan Kamera</Text>
            </Pressable>
        </View>
        )
      }
      
  return (
    <View style={styles.container}>
        <View style={styles.scanner}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={{width: 600, height: 600}}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <Text style={styles.perintah}>
            Arahkan kamera ke QR Code milik pelanggan
        </Text>
        <TouchableOpacity style={styles.kembali}
          onPress={()=>navigation.goBack()}
        >
          <Text style={{
            color: Putih,
            fontSize: 20,
            fontWeight:'bold',
            textAlign:'center'
          }}>
            Kembali
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
    izin:{
        backgroundColor: IjoTua,
        borderRadius: 5,
        padding: 5,
    },
    container: {
        flex: 1,
        backgroundColor: Kuning,
        paddingTop: height * 0.1,
      },
    scanner:{
        width: 300,
        height: 300,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        borderRadius: 20,
        alignSelf:'center',
        margin: 20,
    },
    perintah:{
        fontSize: 18,
        fontWeight:'bold',
        color: Ijo,
        textAlign:'center',
    },
    kembali:{
        backgroundColor: Ijo,
        borderRadius: 20,
        width: width * 0.8,
        height: height * 0.06,
        alignSelf: 'center',
        justifyContent:'center',
        marginTop: height * 0.1,
    },
})