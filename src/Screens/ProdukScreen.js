import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih,  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import ProdukKosong from '../Components/ProdukKosong'
//import { daftarproduk } from '../Data/daftarproduk'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
 
const { width, height } = Dimensions.get('window')

const kosongproduk = () => {
  return(
  <View style={{alignItems:'center'}}>
    <ProdukKosong/>
    <Text style={{
      fontSize: 16, color: IjoTua, textAlign:'center',
      width: width*0.8,
    }}>
      Kamu tidak punya produk utama. Buat produk utama
      dengan ketuk tanda plus di kanan bawah.
    </Text>
  </View>
  )
}

const atasproduk = () => {
  return(
    <View>
      <View style={{flexDirection:'row', marginVertical:10}}>
        <PencarianBar />
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={styles.judul}>Produk Utama</Text>
        <Text style={styles.deskripsi}>Produk utama adalah produk yang siap dibawa mitra.</Text>
      </View>
    </View>
  )
}

const ProdukScreen = ({ navigation }) => {

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
          const { image, harga, namaproduk, deskproduk, kuantitas, satuan, kategori} = doc.data();
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
        <View>
              <View>
              <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom:80}} 
                  numColumns={3}
                  columnWrapperStyle={{justifyContent:'space-around'}}
                  data={produkutama}
                  renderItem= {({item}) => <ListProduk item={item} />}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponent= {atasproduk}
                  ListEmptyComponent={kosongproduk}
                  ListFooterComponent={<View style={{height:10}}></View>}
              />
              </View>
        </View>
      </View>
      )}
        <Pressable style={styles.tambah}
              onPress={() => navigation.navigate('TambahScreen')}
              >
              <Text style={{fontSize:35, fontWeight:'bold', color: Putih}}>
              +</Text>
        </Pressable>
    </View>

  )
}

export default ProdukScreen

const styles = StyleSheet.create({
  latar: {
    backgroundColor: Kuning,
    flex: 1,
    paddingHorizontal: 10,
  },
  judul:{
    fontSize: 20,
    fontWeight: 'bold',
    color: IjoTua,
  },
  deskripsi:{
    fontSize: 16,
    color: IjoTua,
  },
  tambah:{
    position: 'absolute',
    bottom: 20,
    right: 10,
    height: 70,
    width: 70,
    backgroundColor: Ijo,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})