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
    LanjutBelanjaScreen,
    DetailScreen,
    EditProdukScreen,
    RiwayatScreen, 
    ReceiptScreen,
    ProsesScreen,
    PanggilanScreen,
    AkunScreen, 
    EditScreen,
    SignInScreen, 
    SignUpScreen, 
    FLocScreen,
    ProdukScreen,
    PreOrderScreen,
    LangsungScreen,
    CheckoutLangScreen,
    ScanScreen,
    TQScreen,
    AkunJadiScreen,
} from '../Screens/Index.js';
import TabNavigasi from '../Components/TabNavigasi.js';
import { Ijo, Putih } from '../Utils/Warna.js';
import TopTab from '../Components/TopTab.js';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../store.js';


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
            <Tab.Screen name="Akun" component={AkunScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
  };

export const Gerbang = () => {
return(
  <NavigationContainer>
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="FLocScreen" component={FLocScreen} options={{ title: "Lokasi Mangkal", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
        <Stack.Screen name="AkunJadiScreen" component={AkunJadiScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </Provider>
  </NavigationContainer>
);
};

export const AppUtama = () => {
    return(
    <NavigationContainer>
      <Provider store={store}>
        <HomeStack.Navigator>
          <HomeStack.Screen name="HomeScreen" component={HomeStackScreen} options={{ headerShown: false }}/>
          <HomeStack.Screen name="ProdukScreen" component={ProdukScreen} options={{ title: "Daftar Produk Utama", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="PreOrderScreen" component={PreOrderScreen} options={{ title: "Daftar Produk Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="TambahScreen" component={TambahScreen} options={{ title: "Tambah Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="TambahPreScreen" component={TambahPreScreen} options={{ title: "Tambah Produk Pre-Order", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="Panggilan" component={Panggilan} options={{ headerShown: false }}/>
          <HomeStack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }}/>
          <HomeStack.Screen name="EditProdukScreen" component={EditProdukScreen} options={{ title: "Perbarui Data Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="LangsungScreen" component={LangsungScreen} options={{ title: "Transaksi Baru", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="CheckoutLangScreen" component={CheckoutLangScreen} options={{ title: "Checkout Temu Langsung", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="ScanScreen" component={ScanScreen} options={{ title: "Scan QR Code Pelanggan", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="TQScreen" component={TQScreen} options={{ headerShown: false  }}/>
          <HomeStack.Screen name="ReceiptScreen" component={ReceiptScreen} options={{  title: "Bukti Transaksi", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}    }}/>
          <HomeStack.Screen name="PanggilanScreen" component={PanggilanScreen} options={{ headerShown: false }}/>

          <HomeStack.Screen name="AkunScreen" component={AkunScreen} options={{ headerShown: false }}/>
          <HomeStack.Screen name="EditScreen" component={EditScreen} options={{ title: "Atur Profil", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
          <HomeStack.Screen name="FLocScreen" component={FLocScreen} options={{ title: "Lokasi Mangkal", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
        </HomeStack.Navigator>
      </Provider>
    </NavigationContainer>
    );
  };

const Panggilan = () => {
  return(
  <RiwayatStack.Navigator>
    <RiwayatStack.Screen name="OtwScreen" component={OtwScreen} options={{ title: "Manuju Lokasi", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
    <RiwayatStack.Screen name="LanjutBelanjaScreen" component={LanjutBelanjaScreen} options={{ title: "Lanjut Belanja", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo} }}/>
  </RiwayatStack.Navigator>
  );
};


  