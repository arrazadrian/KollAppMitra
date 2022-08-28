import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ijo, IjoTua, Kuning } from '../Utils/Warna';

const { width, height } = Dimensions.get('window')

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


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
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        justifyContent:'center',
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
    }
})