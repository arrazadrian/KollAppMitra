import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah } from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
//import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import { useDispatch, useSelector } from 'react-redux';
import Keranjang from '../Components/Keranjang'
import ProdukKosong from '../Components/ProdukKosong'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { updateKategori } from '../features/kategoriSlice'


const { width, height } = Dimensions.get('window')

const kosongproduk = () => {
  return(
  <View style={{alignItems:'center', paddingBottom:40}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk kategori ini. Kembali ke beranda dan 
      ketuk bagian produk utama unuk membuatnya.
    </Text>
  </View>
  )
}

const atasjual = () => {
  const[pilkategori, setPilkategori]= useState("Semua Produk")
  const dispatch = useDispatch();

  useEffect(() => {
    pilihKategori();
  }, [pilkategori]);

  const pilihKategori = () => {
    dispatch(updateKategori({pilkategori}));
    console.log("Kategori yg dipilih: " + pilkategori)
  };

  return(
    <View style={{ paddingTop:'18%' }}>
      <View>
          <View style={{ paddingHorizontal: 10, marginBottom:10 }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Kategori</Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingStart: 10, paddingEnd: 10}}>
            {jeniskategori.map((item, index) => (
              <TouchableOpacity key={index}
                style={{backgroundColor: pilkategori == item.nama ? IjoMint : Putih, ...styles.kartuKategori}}
                onPress={() =>setPilkategori(item.nama)}>
                <View style={ styles.kategoripilihan}>
                    <Image source={item.image} style={styles.gambar} />
                </View>
                <Text style={{color: pilkategori == item.nama ? Ijo : IjoTua,...styles.nama}}>{item.nama}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
      </View>
      <View style={{paddingHorizontal: 10, marginBottom:10 }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Daftar Produk</Text>
      </View>
    </View>
  )
}


const LangsungScreen = ({ navigation }) => {

  const[produkutama,setProdukUtama] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  const { pilkategori } = useSelector(state => state.kategori);

  useEffect(()=>{
    const fetchProdukUtama = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", auth.currentUser.uid);
        const colRef = collection(docRef, "produk")

        if ( pilkategori == "Semua Produk" ) {
        const q = query(colRef, where("jenis", "==", "Produk utama"), orderBy("namaproduk"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const {image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
          list.push({
            id: doc.id,
            namaproduk,
            deskproduk,
            image,
            harga,
            kuantitas,
            satuan,
            kategori,
          });
        });
        } else {
          const qq = query(colRef, where("jenis", "==", "Produk utama"), where("kategori", "==", pilkategori), orderBy("namaproduk"));
          const querySnapshot = await getDocs(qq);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const {image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
            list.push({
              id: doc.id,
              namaproduk,
              deskproduk,
              image,
              harga,
              kuantitas,
              satuan,
              kategori,
            });
          });
        }

        if (componentMounted.current){ // (5) is component still mounted?
          setProdukUtama(list); // (1) write data to state
          setLoading(false); // (2) write some value to state
        }
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }

      } catch(err){
        console.log(err);
      }
    }
    fetchProdukUtama();
  },[pilkategori])

  
  return (
    <View style={styles.latar}>
      {loading ? (
        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
          <ActivityIndicator size="large" color={IjoTua}/>
        </View>
      ):(
        <View> 
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent:'space-around',
                  paddingHorizontal: 10,
                }}
                data={produkutama}
                renderItem= {({item}) => <JualProduk item={item} />}
                keyExtractor={ item => item.id}
                ListHeaderComponent={atasjual}
                ListEmptyComponent={kosongproduk}
                ListFooterComponent={
                <View>
                  <Image source={Bawah} style={styles.bawah}/>
                </View>
                }
            />
            <PencarianBar/>
            <Keranjang/>
        </View>
      )}
    </View>
  )
}

export default LangsungScreen

const styles = StyleSheet.create({
  latar:{
    flex: 1,
    backgroundColor: Kuning,
  },
  bawah:{
    marginTop: '40%',
    flex: 1,
    width: '100%',
    height: height*0.15,
  }, 
  nama:{
    fontSize: 14,
    fontWeight: 'bold',
    width: 60,
  },  
  gambar:{
    width: width*0.1,
    height: width*0.1,
  },
  kartuKategori:{
    flexDirection: 'row',
    alignSelf:'center',
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    borderRadius: 50,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  kategoripilihan:{
    alignItems:'center',
    padding: 5, 
    borderRadius: 50, 
    marginRight: 10,
    backgroundColor: Putih,
  },
})