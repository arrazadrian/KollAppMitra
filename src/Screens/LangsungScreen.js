import { Pressable, StyleSheet, Text, View, Image, ScrollView, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Ijo, IjoMint, IjoTua, Kuning, Putih } from '../Utils/Warna'
import { Bawah } from '../assets/Images/Index'
import PencarianBar from '../Components/PencarianBar'
import JualProduk from '../Components/JualProduk'
//import { daftarproduk } from '../Data/daftarproduk'
import { jeniskategori } from '../Data/jeniskategori'
import LogoKategori from '../Components/LogoKategori'
import Keranjang from '../Components/Keranjang'
import ProdukKosong from '../Components/ProdukKosong'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';


const { width, height } = Dimensions.get('window')

const kosongproduk = () => {
  return(
  <View style={{alignItems:'center', paddingBottom:40}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk utama. Kembali ke beranda dan 
      ketuk bagian produk utama unuk membuatnya.
    </Text>
  </View>
  )
}

const atasjual = () => {
  return(
    <View style={{ paddingHorizontal: 10, paddingTop:'18%' }}>
      <View>
          <View style={{marginBottom:10 }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Kategori</Text>
          </View>
          <View>
              <FlatList
                  horizontal= {true}
                  data={jeniskategori}
                  renderItem= {({item}) => <LogoKategori item={item} />}
                  keyExtractor={ jeniskategori => jeniskategori.id}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
              />
          </View>
      </View>
      <View style={{marginBottom:10 }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: Ijo}}>Daftar Produk</Text>
      </View>
    </View>
  )
}


const LangsungScreen = ({ navigation }) => {

  const[produkutama,setProdukUtama] = useState();
  const[loading, setLoading] = useState(true);
  const componentMounted = useRef(true);

  useEffect(()=>{
    const fetchProdukUtama = async() => {
      try{
        const list = []; 
        const auth = getAuth();
        const db = getFirestore(app);
        const docRef = doc(db, "mitra", auth.currentUser.uid);
        const colRef = collection(docRef, "produk")

        const q = query(colRef, where("jenis", "==", "Produk utama"), orderBy("waktudibuat","desc"));
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
  },[])

  
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
    flex: 5,
    backgroundColor: Kuning,
  },
  bawah:{
    marginTop: '10%',
    flex: 1,
    width: '100%',
    height: height*0.15,
  },  
})