import { StyleSheet, Text, View, Pressable, Dimensions, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Ijo, IjoTua, Kuning, Putih, IjoMint  } from '../Utils/Warna'
import ListProduk from '../Components/ListProduk'
import PencarianBar from '../Components/PencarianBar'
import ProdukKosong from '../Components/ProdukKosong'
//import { daftarproduk } from '../Data/daftarproduk'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { app } from '../../Firebase/config';
import { updateKategori } from '../features/kategoriSlice'
import { jeniskategori } from '../Data/jeniskategori'
import { useDispatch, useSelector } from 'react-redux';

 
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
  const[pilkategori, setPilkategori]= useState("Semua Produk")
  const dispatch = useDispatch();

  useEffect(() => {
    const pilihKategori = () => {
      dispatch(updateKategori({pilkategori}));
      console.log("Kategori yg dipilih: " + pilkategori)
    };
    pilihKategori();
  }, [pilkategori]);

  return(
    <View style={{paddingTop: 10}}>
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
      <View style={{marginBottom: 10, paddingHorizontal: 10}}>
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
          } else {
            const qq = query(colRef, where("jenis", "==", "Produk utama"), where("kategori", "==", pilkategori), orderBy("waktudibuat","desc"));
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