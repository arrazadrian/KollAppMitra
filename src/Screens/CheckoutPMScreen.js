import { StyleSheet, Text, ScrollView, Image, View, Pressable, Alert, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IjoTua, Kuning, Putih, Ijo, IjoMint } from '../Utils/Warna'
//import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'
//import ProdukKeranjang from '../Components/ProdukKeranjang'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'
import { 
  pilihProdukKeranjang, 
  totalHarga, 
  kosongkanKeranjang,
 } from '../features/keranjangSlice'
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import { app } from '../../Firebase/config';
import { selesaikanPM, updateTersediaVoucher } from '../../API/firebasemethod'
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')
 
const CheckoutPMScreen = ({ route }) => {

  const { 
    id_transaksi, hargalayanan,
     } = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const { potongan, id_voucher } = useSelector(state => state.voucher);

  const selesaiTransaksi =()=> {
    Alert.alert('Apakah transaksi sudah sesuai?','Pastikan belanjaan sudah sesuai dan pelanggan sudah melunasi belanjaan.',
          [
            {
              text: 'Tutup',
              onPress: () => {
                console.log('Tutup dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: selesaikanPanggilMitra,
            }
          ]
          )
  }

async function selesaikanPanggilMitra(){
  try{
    let jumlah_kuantitas = items.length;
    let pembayaran = "Lunas"
    if (!items) {
      Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
    } else if (potongan == 0) {
      await selesaikanPM(
        id_transaksi,
        kelompokProduk,
        subtotalhargaKeranjang,
        hargalayanan,
        hargatotalsemua,
        jumlah_kuantitas,
        pembayaran,
        id_voucher,
        potongan,
      );
      navigation.navigate("TQScreen");
      //dispatch(kosongkanKeranjang());
    } else {
      const db = getFirestore(app);
      const docRefVou = doc(db, "promosi", id_voucher);
      const docSnapVou = await getDoc(docRefVou);

      if(docSnapVou.exists()){
        if(docSnapVou.data().tersedia == false){
          Alert.alert('Voucher sudah tidak berlaku','Kuota pengguna vouher sudah habis.');
        } else {
          await selesaikanPM(
            id_transaksi,
            kelompokProduk,
            subtotalhargaKeranjang,
            hargalayanan,
            hargatotalsemua,
            jumlah_kuantitas,
            pembayaran,
            id_voucher,
            potongan,
          );
          await updateTersediaVoucher(
            id_voucher,
            potongan,
          );
          navigation.navigate("TQScreen");
        }
      }
    }
  } catch (err){
    Alert.alert('Ada error menyelesaikan Panggilan Mitra!', err.message);
  }  
  };

  useEffect(() => {
    const kelompok = items.reduce((results, item) => {
      (results[item.item.id] = results[item.item.id] || []).push(item.item);
      return results;
    }, {});

    

    const jikakosong = () => {
      if(!items.length){
        navigation.goBack();
      }
    };
    
    setKelompokProduk(kelompok);
    jikakosong();

  }, [items]);

  const [namamitra, setNamamitra] = useState("");
    const [namatoko, setNamatoko] = useState("");
    const [namapelanggan, setNamapelanggan] = useState("");
    const [id_pelanggan, setId_pelanggan] = useState("");
    const [phonepelanggan, setPhonepelanggan] = useState("");
  
    //Untuk mendapatkan data yg dibutuhkan kasbon
    useEffect(() => {
        // let unmounted = false; 
        async function getDatakasbon(){
          const db = getFirestore(app);
          const docRef = doc(db, "transaksi", id_transaksi);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
                setNamamitra(docSnap.data().namamitra)
                setNamatoko(docSnap.data().namatoko)
                setNamapelanggan(docSnap.data().namapelanggan)
                setId_pelanggan(docSnap.data().id_pelanggan)
                setPhonepelanggan(docSnap.data().phonepelanggan)
                console.log('getDataKasbon jalan!')
          } else { 
            // doc.data() will be undefined in this case
            console.log("No such document!");
          };
        };
    
        getDatakasbon();
    },[])

 
  const subtotalhargaKeranjang = useSelector(totalHarga)
  //Harga Layananan dari route.param di atas
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan - potongan
 

  const pindahKasbon = () => {
    navigation.navigate('AdaKasbonPMScreen',{
      id_transaksi: id_transaksi,
      hargalayanan: hargalayanan,
      hargatotalsemua: hargatotalsemua,
      namamitra: namamitra,
      namatoko: namatoko,
      namapelanggan: namapelanggan,
      id_pelanggan: id_pelanggan,
      phonepelanggan: phonepelanggan,

    })
  };

  const ScanVoucerPromo = () => {
    return(
      <Pressable style={styles.scan}  onPress={pindahScanVoucher}>
          <View style={{backgroundColor: Ijo, padding: 10, borderRadius: 20}}>
            <Ionicons name="pricetags" size={20} color={IjoMint}/>
          </View>
          { id_voucher ? (
            <View>
              <Text style={styles.nama}>Voucher Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
            </View>
            ):(
            <View>
              <Text  style={styles.deskscan}>Scan QR Voucher</Text>
            </View>
          )
          }
          <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
      </Pressable>
    )
  };

  const pindahScanVoucher = () =>{
    navigation.navigate('ScanVoucherScreen',{
      jenis_layanan: 'Panggil Mitra',
      subtotalhargaKeranjang: subtotalhargaKeranjang,
    })
  }

  return (
    <View style={styles.latar}>
      <ScanVoucerPromo/>
      <ScrollView style={styles.atas}>
            {Object.entries(kelompokProduk).map(([key, items]) => (
            <View key={key}>
            <View style={styles.card}>
              <View style={{flexDirection:'row', marginTop: 5, alignItems:'center', paddingHorizontal: 5}}>
                  <Text style={{fontSize: 16}}>{items.length} x</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={{uri: items[0]?.image}} style={styles.foto}/>
                  <View>
                      <Text style={styles.produk} numberOfLines={1}>{items[0]?.namaproduk}</Text>
                      <Text>Rp{new Intl.NumberFormat('id-Id').format(items[0]?.harga).toString()}</Text>
                  </View>
              </View>
              <View style={{justifyContent:'center'}}>
                  <Text style={styles.harga}>
                    Rp{new Intl.NumberFormat('id-Id').format(items.length * items[0]?.harga).toString()}
                  </Text>
              </View>
          </View>
          </View>
            ))}
      </ScrollView>
      <View style={styles.simpulan}>
          <View style={styles.desk}>
            <Text>Subtotal</Text>
            <Text>Rp{new Intl.NumberFormat('id-Id').format(subtotalhargaKeranjang).toString()}</Text>
          </View>
          { potongan ?
            (
            <View style={styles.desk}>
              <Text>Potongan</Text>
              <Text>-Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
            </View>
            ):(null)
          }
          <View style={styles.desk}>
            <Text>Biaya Layanan</Text>
            <Text>Rp{new Intl.NumberFormat('id-Id').format(hargalayanan).toString()}</Text>
          </View>
          <View style={styles.desk}>
            <Text>Harga Total</Text>
            <Text  style={styles.harga}>Rp{new Intl.NumberFormat('id-Id').format(hargatotalsemua).toString()}</Text>
          </View>

          <View style={{borderWidth: 0.5, borderColor: Ijo, marginVertical: 10}}/>
          
          <View style={styles.desk}>
            <TouchableOpacity style={styles.tombolkasbon}
                onPress={pindahKasbon}>
                <Text style={{color:Ijo, fontWeight:'bold', textAlign:'center'}}>Masuk Kasbon</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.tombollunas}
              onPress={selesaiTransaksi}>
              <Text style={{color:Putih, fontWeight:'bold'}}>Selesaikan Pesanan</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default CheckoutPMScreen

const styles = StyleSheet.create({
    latar:{
      backgroundColor: Kuning,
      flex: 1,
    },
    scan:{
      flexDirection:'row',
      borderBottomColor: Ijo,
      borderBottomWidth: 0.5,
      padding: 8,
      alignItems:'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    deskscan:{
      color: Ijo,
      fontSize: 16,
    },
    nama:{
      color: IjoTua,
      fontSize: 18,
      fontWeight: 'bold',
    },
    atas:{
      paddingHorizontal:10
    },
    card:{
      borderColor: Ijo,
      borderWidth: 0.3,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 10,
      marginVertical: 4,
    },
    foto:{
      width: width * 0.15,
      height: width * 0.15,
      borderColor: Ijo,
      borderWidth: 1,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    produk:{
        fontSize: 16,
        width: width * 0.36,
    },
    harga:{
        fontSize: 18,
        fontWeight:'bold',
    },
    logoTombol:{
        color: Putih,
        fontWeight: 'bold',
        fontSize: 16,
    },
    simpulan:{
      position:'absolute',
      padding: 20,
      backgroundColor: IjoMint,
      width: width,
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    desk:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    harga:{
      fontSize: 18,
      fontWeight:'bold',
    },
    tombollunas:{
      borderRadius: 10,
      padding: 10,
      backgroundColor: Ijo,
    },
    tombolkasbon:{
      borderRadius: 10,
      padding: 10,
      backgroundColor: Putih,
      width: '48%',
    },
})