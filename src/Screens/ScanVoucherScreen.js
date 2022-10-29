import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna';
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { updateUID } from '../features/pelangganSlice';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { updateVoucher } from '../features/voucherSlice';

const { width, height } = Dimensions.get('window')

const ScanVoucherScreen = ({ route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [potongan, setPotongan] = useState();
    const [id_voucher, setId_voucher] = useState();
    const dispatch = useDispatch();

    const { 
        jenis_layanan, subtotalhargaKeranjang,
         } = route.params;

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

      const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        console.log(data);
        try {
          const db = getFirestore(app)
          const docRef = doc(db, "promosi", data);
          await getDoc(docRef).then(docSnap => {
            if (docSnap.exists()){
                if(jenis_layanan != docSnap.data().jenis_layanan){
                    Alert.alert(`Voucher ini untuk layanan ${docSnap.data().jenis_layanan}`, `Kamu sedang dalam layanan ${jenis_layanan}.`);
                    navigation.goBack();
                } else if(docSnap.data().tersedia == false){
                    Alert.alert(`Pelanggan kurang beruntung`, `Maaf voucher sudah tidak berlaku.`);
                    navigation.goBack();
                } else if(subtotalhargaKeranjang < docSnap.data().minimal){
                    Alert.alert(`Total belanja pelanggan masih kurang`, `Syarat minimal belanja Rp${docSnap.data().minimal}.`);
                    navigation.goBack();
                } else {
                    setId_voucher(data);
                    setPotongan(Number(docSnap.data().potongan));
                }
            } else {
              Alert.alert('QR Code tidak dikenal','Pastikan QR Code berasal dari voucher aplikasi Koll.');
              console.log('Gagal masuk redux')
              navigation.goBack();
            }
          });
        } catch {
          console.log('Ada yg salah bung di asycn ini')
        }
      };

    useEffect(() => {
        masukredux();
    }, [potongan]);

      const masukredux = () =>{
        if(potongan){
          dispatch(updateVoucher({id_voucher, potongan}));
          console.log('id_voucher:' + id_voucher)
          console.log('potongan:' + potongan)
          console.log('jenis potongan: ' + typeof(potongan))
          navigation.goBack();
        } else {
          console.log('Gagal nih ga masuk redux')
        }
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
            Arahkan kamera ke QR code voucher dari pelangan 
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

export default ScanVoucherScreen

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
        marginHorizontal: 20,
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