import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    SplashScreen, 
    HomeScreen, 
    TambahScreen,
    RiwayatScreen, 
    ProsesScreen,
    AkunScreen, 
    EditScreen,
    SignInScreen, 
    SignUpScreen, 
} from '../Screens/Index.js';
import TabNavigasi from '../Components/TabNavigasi.js';
import { Ijo, Putih } from '../Utils/Warna.js';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiwayatStack = createNativeStackNavigator();
const AkunStack = createNativeStackNavigator();

const AppUtama = () =>{
    return(
        <Tab.Navigator tabBar={props => <TabNavigasi {...props}/>}>
            <Tab.Screen name="Beranda" component={HomeStackScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Riwayat" component={RiwayatStackScreen} options={{ headerShown: false }}/>
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

const HomeStackScreen = () => {
    return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="TambahScreen" component={TambahScreen} options={{ title: "Tambah Produk", headerTintColor: Putih, headerStyle:{backgroundColor: Ijo}  }}/>
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