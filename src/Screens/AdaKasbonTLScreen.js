import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image, Pressable, Alert} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Kuning, IjoTua, Ijo, Putih, IjoMint } from '../Utils/Warna'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import { app } from '../../Firebase/config'
import { DompetKasbon } from '../assets/Images/Index'
import { 
  pilihProdukKeranjang, 
  totalHarga, 
 } from '../features/keranjangSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { buatKasbonBaru, buatTransaksiTL, tambahTransaksiKasbon, updateTersediaVoucher } from '../../API/firebasemethod'
import moment from 'moment'
import localization from 'moment/locale/id'
import "intl";
import "intl/locale-data/jsonp/id";

const { width, height } = Dimensions.get('window')

const AdaKasbonTLScreen = () => {

  moment.updateLocale('id', localization);

  const kasbonBaru =()=> {
    Alert.alert('Anda yakin buat kasbon baru?','Pastikan anda mengenal pelanggan tersebut dan dapat mempercayainya.',
          [
            {
              text: 'Batal',
              onPress: () => {
                console.log('Batal dipencet')
              }
            },
            {
              text: 'Yakin',
              onPress: TemuLangsungKasbon,
            }
          ]
          )
  }

  async function TemuLangsungKasbon(){
    try{
      let jumlah_kuantitas = items.length;
      let pembayaran = 'Kasbon';
      let id_pelanggan = kodeUID;
      if (!namapelanggan) {
        Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
      } else if (!namamitra) {
        Alert.alert('Nama mitra kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!namatoko) {
        Alert.alert('Nama toko kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!items) {
        Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
      } else if (potongan == 0){
        const id_transaksi = await buatTransaksiTL(
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
        buatKasbonBaru(
          namamitra,
          namatoko,
          namapelanggan,
          id_pelanggan,
          phonepelanggan,
          hargatotalsemua,
          id_transaksi,
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
           const id_transaksi = await buatTransaksiTL(
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
            buatKasbonBaru(
              namamitra,
              namatoko,
              namapelanggan,
              id_pelanggan,
              phonepelanggan,
              hargatotalsemua,
              id_transaksi,
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
      Alert.alert('Ada error buat transaksi temu langsung dengan kasbon!', err.message);
    }  
  };

  async function tambahkanKasbon(id_kasbon){
    try{
      let jumlah_kuantitas = items.length;
      let pembayaran = 'Kasbon';
      let id_pelanggan = kodeUID;
      if (!namapelanggan) {
        Alert.alert('Nama pelangan masih kosong','Scan QR Code milik pelanggan terlebih dahulu.');
      } else if (!namamitra) {
        Alert.alert('Nama mitra kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!namatoko) {
        Alert.alert('Nama toko kosong','Silahkan tutup dan buka kembali aplikasi ini.');
      } else if (!items) {
        Alert.alert('Tidak ada produk yang dibeli','Transaksi tidak bisa dilakukan.');
      } else if (potongan == 0){
        const id_transaksi = await buatTransaksiTL(
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
        tambahTransaksiKasbon(
          id_kasbon,
          hargatotalsemua,
          id_transaksi
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
            const id_transaksi = await buatTransaksiTL(
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
            await tambahTransaksiKasbon(
              id_kasbon,
              hargatotalsemua,
              id_transaksi
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
      Alert.alert('Ada error buat transaksi temu langsung dengan kasbon!', err.message);
    }  
  }

  const navigation = useNavigation();
  const items = useSelector(pilihProdukKeranjang)
  const [kelompokProduk, setKelompokProduk] = useState([]);

  const { kodeUID, namapelanggan, phonepelanggan } = useSelector(state => state.pelanggan);
  const { namamitra, namatoko } = useSelector(state => state.mitra);
  const { potongan, id_voucher } = useSelector(state => state.voucher);

  const subtotalhargaKeranjang = useSelector(totalHarga)
  const hargalayanan =  0
  const hargatotalsemua = subtotalhargaKeranjang + hargalayanan - potongan

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
 

  const[adakasbon,setAdaKasbon] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchKasbon = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const colRef = collection(db, "kasbon")

        const q = query(colRef, where("id_mitra", "==", auth.currentUser.uid), where("id_pelanggan", "==", kodeUID), where("status_kasbon", "==", "Belum Lunas"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const { 
            id_mitra, 
            namamitra,
            namatoko,
            id_pelanggan,
            namapelanggan,
            status_kasbon,
            waktu_dibuat,
            transaksi,
            total_kasbon,
          } = doc.data();
          list.push({
            id: doc.id,
            id_mitra, 
            namamitra,
            namatoko,
            id_pelanggan,
            namapelanggan,
            status_kasbon,
            waktu_dibuat,
            transaksi,
            total_kasbon,
          });
        });
        
        if (componentMounted.current){ // (5) is component still mounted?
          setAdaKasbon(list); // (1) write data to state
          setLoading(false); // (2) write some value to state
        }
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

      } catch(err){
        console.log(err);
      }
    }
    fetchKasbon();
  },[]);



  return (
    <View style={styles.latar}>
      {loading ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:80}} 
          data={adakasbon}
          renderItem= {({item}) => 
              <View style={styles.card}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <Text style={styles.nama}>{item.namapelanggan}</Text>
                        <Text style={{fontSize: 12}}>Mulai dari: {moment(item.waktu_dibuat.toDate()).calendar()}</Text>
                    </View>
                    <View>
                        <Text style={{marginBottom: -5, fontSize: 12, textAlign:'right'}}>Total Kasbon</Text>
                        <Text style={styles.total}>Rp{new Intl.NumberFormat('id-Id').format(item.total_kasbon).toString()}</Text>
                    </View>
                </View>
                <Pressable style={styles.tomboltambah} onPress={() => tambahkanKasbon(item.id)}>
                    <Text style={{fontSize: 16, textAlign:'center', color: Ijo, fontWeight:'bold'}}>Tambahkan dalam kasbon ini</Text>
                </Pressable>
              </View>
            }
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height:10}}></View>}
          ListHeaderComponent={<View style={{height:10}}></View>}
          ListEmptyComponent={ 
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image style={styles.dompet} source={DompetKasbon}/>
              <Text style={styles.none}>Pelanggan ini sedang tidak punya kasbon yang belum dibayar</Text> 
              <Pressable style={styles.tombol} onPress={kasbonBaru}>
                  <Text style={styles.tomboltext}>Buat kasbon baru</Text>
              </Pressable> 
            </View>
          }
      />
      )}
    </View>
  )
}



export default AdaKasbonTLScreen

const styles = StyleSheet.create({
    latar:{
        flex: 1,
        backgroundColor: Kuning,
    },
    tombol:{
      backgroundColor: Ijo,
      width:'50%',
      padding: 10,
      borderRadius: 20,
    },
    tomboltambah:{
      backgroundColor: IjoMint,
      width:'100%',
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      alignSelf:'center',
    },
    dompet:{
      width: width * 0.4,
      height: width * 0.3,
      marginTop: height * 0.25,
      marginBottom: 10,
    },
    none:{
      fontSize: 16,
      fontWeight:'bold',
      color: Ijo,
      textAlign:'center',
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    tomboltext:{
      fontSize: 18,
      textAlign:'center',
      color: Putih,
      fontWeight:'bold',
    },
    card:{
      backgroundColor: Putih,
      borderColor: Ijo,
      borderWidth: 1,
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 10,
      elevation: 5,
      padding: 10,
    },
    nama:{
      color: IjoTua,
      fontSize: 16,
      fontWeight: 'bold',
    },
    total:{
        color: Ijo,
        fontSize: 18,
        fontWeight: 'bold',
    },
})