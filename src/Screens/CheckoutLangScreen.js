import { StyleSheet, Text, ScrollView, Image, View, Pressable, Alert, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IjoTua, Kuning, Putih, Ijo, IjoMint } from '../Utils/Warna'
//import ListReceipt from '../Components/ListReceipt'
import { useNavigation } from '@react-navigation/native'
//import ProdukKeranjang from '../Components/ProdukKeranjang'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { 
  pilihProdukKeranjang, 
  totalHarga, 
  kosongkanKeranjang,
 } from '../features/keranjangSlice'
import { resetPelanggan } from '../features/pelangganSlice';
import { buatTransaksiTL, updateTersediaVoucher } from '../../API/firebasemethod'
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import { app } from '../../Firebase/config';
import "intl";
import "intl/locale-data/jsonp/id";
 

const { width, height } = Dimensions.get('window')
 
const CheckoutLangScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const { kodeUID, namapelanggan } = useSelector(state => state.pelanggan);
  const { namamitra, namatoko } = useSelector(state => state.mitra);
  const { potongan, id_voucher } = useSelector(state => state.voucher);

  const selesaiTransaksi =()=> {
    Alert.alert('Apakah transaksi sudah sesuai?','Sebelum menyelesaikan transaksi, pastikan belanjaan sudah sesuai dan pelanggan sudah melunasi belanjaan.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Sudah',
              onPress: uploadtransaksiTemuLangsung,
            }
          ]
          )
  }

  const pindahKasbon = () => {
    if (!namapelanggan) {
      Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
    } else navigation.navigate('AdaKasbonTLScreen')
  };
  
  async function uploadtransaksiTemuLangsung(){
    try{
      let jumlah_kuantitas = items.length;
      let pembayaran = 'Lunas';
      let id_pelanggan = kodeUID;
      if (!namapelanggan) {
        Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
      } else if (!namamitra) {
        Alert.alert('Nama mitra kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!namatoko) {
        Alert.alert('Nama toko kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!items) {
        Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
      } else if (potongan == 0) {
          buatTransaksiTL(
            namamitra,
            namatoko,
            namapelanggan,
            id_pelanggan,
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
      } else {        
        const db = getFirestore(app);
        const docRefVou = doc(db, "promosi", id_voucher);
        const docSnapVou = await getDoc(docRefVou);

        if(docSnapVou.exists()){
          if(docSnapVou.data().tersedia == false){
            Alert.alert('Voucher sudah tidak berlaku','Kuota pengguna vouher sudah habis.');
          } else {
            await buatTransaksiTL(
              namamitra,
              namatoko,
              namapelanggan,
              id_pelanggan,
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
      Alert.alert('Ada error buat transaksi temu langsung!', err.message);
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

  //console.log(kelompokProduk);
  // console.log(kodeUID);
  // console.log(namapelanggan);
 
  const subtotalhargaKeranjang = useSelector(totalHarga)
  const hargalayanan =  0
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan - potongan

  const ScanQRPelanggan = () => {
    return(
      <Pressable style={styles.scan} onPress={() => navigation.push('ScanScreen')}>
          <View style={{backgroundColor: Ijo, padding: 10, borderRadius: 20}}>
            <Ionicons name="person" size={20} color={IjoMint}/>
          </View>
          { kodeUID ? (
            <View>
              <Text>Nama Pelanggan</Text>  
              <Text style={styles.nama}>{namapelanggan}</Text>  
            </View>
            ):(
              <View>
                <Text style={styles.deskscan}>Scan QR Pelanggan</Text>
              </View>
              )
            }
          <Ionicons name="chevron-forward-outline" size={15} color={Ijo}/>
      </Pressable>
    )
  };

  const pindahScanVoucher = () =>{
    navigation.navigate('ScanVoucherScreen',{
      jenis_layanan: 'Temu Langsung',
      subtotalhargaKeranjang: subtotalhargaKeranjang,
    })
  }

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
 
  return (
    <View style={styles.latar}>
      <ScanQRPelanggan/>
      <ScanVoucerPromo/>
      <ScrollView style={styles.atas}>
        <Text style={{fontSize: 16, fontWeight:'bold', color: IjoTua}}>Daftar Belanjaan</Text>
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
                  <Text style={styles.harga}>Rp{new Intl.NumberFormat('id-Id').format(items[0]?.harga * items.length).toString()}</Text>
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
              <Text>Potongam</Text>
              <Text>-Rp{new Intl.NumberFormat('id-Id').format(potongan).toString()}</Text>
            </View>
            ):(null)
          }
          <View style={styles.desk}>
            <Text>Biaya Layanan</Text>
            <Text>Rp{hargalayanan}</Text>
          </View>
          <View style={styles.desk}>
            <Text>Harga Total</Text>
            <Text style={styles.harga}>Rp{new Intl.NumberFormat('id-Id').format(hargatotalsemua).toString()}</Text>
          </View>
          <View style={{borderWidth: 0.5, borderColor: Ijo, marginVertical: 10}}/>
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', flex: 1}}>
            <TouchableOpacity style={styles.tombolkasbon}
              onPress={pindahKasbon}>
              <Text style={{color:Ijo, fontWeight:'bold', textAlign:'center'}}>Masuk Kasbon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tombollunas}
              onPress={selesaiTransaksi}>
              <Text style={{color:Putih, fontWeight:'bold', textAlign:'center'}}>Sudah Lunas</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default CheckoutLangScreen

const styles = StyleSheet.create({
    latar:{
      backgroundColor: Kuning,
      flex: 1,
    },
    pelanggan:{
      backgroundColor: Putih,
      marginBottom: 5,
      padding: 10,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    nama:{
      color: IjoTua,
      fontSize: 18,
      fontWeight: 'bold',
    },
    scan:{
      alignItems:'center',
      justifyContent:'center',
      paddingVertical: 2,
    },
    atas:{
      padding:10
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
    card:{
      borderWidth: 0.3,
      borderColor: Ijo,
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
      width: '48%',
    },
    tombolkasbon:{
      borderRadius: 10,
      padding: 10,
      backgroundColor: Putih,
      width: '48%',
    },
})