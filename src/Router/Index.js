import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    SplashScreen, 
    HomeScreen, 
    TambahScreen,
    TambahPreScreen,
    OtwScreen,
    DetailScreen,
    EditProdukScreen,
    RiwayatScreen, 
    ProsesScreen,
    AkunScreen, 
    EditScreen,
    SignInScreen, 
    SignUpScreen, 
    ProdukScreen,
    PreOrderScreen,
    LangsungScreen,
    KategoriScreen,
    CheckoutLangScreen,
} from '../Screens/Index.js';
import TabNavigasi from '../Components/TabNavigasi.js';
import { Ijo, Putih } from '../Utils/Warna.js';
import TopTab from '../Components/TopTab.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiwayatStack = createNativeStackNavigator();
const AkunStack = createNativeStackNavigator();

const HomeStackScreen = () =>{
    return(
        <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
            <Tab.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Pesanan" component={TopTab} options={{ headerShown: false }}/>
            <Tab.Screen name="Akun" component={AkunStackScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
  };

const Gerbang = () => {
return(
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
);
};

const AppUtama = () => {
    return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeStackScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="ProdukScreen" component={ProdukScreen} options={{ title: "Daftar Produk Utama", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="PreOrderScreen" component={PreOrderScreen} options={{ title: "Daftar Produk Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="TambahScreen" component={TambahScreen} options={{ title: "Tambah Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="TambahPreScreen" component={TambahPreScreen} options={{ title: "Tambah Produk Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="Panggilan" component={Panggilan} options={{ title: "Manuju Lokasi", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="EditProdukScreen" component={EditProdukScreen} options={{ title: "Perbarui Data Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="LangsungScreen" component={LangsungScreen} options={{ title: "Transaksi Baru", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
      <HomeStack.Screen name="KategoriScreen" component={KategoriScreen} options={({route}) => ({ title: route.params.nama, headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} })}/>
      <HomeStack.Screen name="CheckoutLangScreen" component={CheckoutLangScreen} options={{ title: "Checkout", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
    </HomeStack.Navigator>
    );
  };

const RiwayatStackScreen = () => {
    return(
    <RiwayatStack.Navigator>
      <RiwayatStack.Screen name="RiwayatScreen" component={RiwayatScreen} options={{ headerShown: false }}/>
      <RiwayatStack.Screen name="ProsesScreen" component={ProsesScreen} options={{ headerShown: false }}/>
    </RiwayatStack.Navigator>
    );
  };

const Panggilan = () => {
  return(
  <RiwayatStack.Navigator>
    <RiwayatStack.Screen name="OtwScreen" component={OtwScreen} options={{ headerShown: false }}/>
  </RiwayatStack.Navigator>
  );
};

const AkunStackScreen = () => {
return(
<AkunStack.Navigator>
    <AkunStack.Screen name="AkunScreen" component={AkunScreen} options={{ headerShown: false }}/>
    <AkunStack.Screen name="EditScreen" component={EditScreen} options={{ title: "Atur Profil", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
</AkunStack.Navigator>
);
};
  
const Routernih = () => {
    return (
      <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Gerbang" component={Gerbang} options={{ headerShown: false }}/>
          <Stack.Screen name="AppUtama" component={AppUtama} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  };
  
  export default Routernih
  
  const styles = StyleSheet.create({})