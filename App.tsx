import React from "react";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Perfil from "./src/screens/Perfil";
import Carrinho from "./src/screens/Carrinho";
import Pagamento from "./src/screens/Pagamento";
import { RootStackParamList } from "./src/navigation/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRCodeScreen from "./src/screens/QrCode";
import Cadastro from "./src/screens/Cadastro";
import Pix from "./src/screens/Pix";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/*Inicialização definida para tela de Login || Para testes, substituir para a tela desejada*/}
      <Stack.Navigator initialRouteName="Pagamento" id={undefined}> 
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Carrinho" component={Carrinho} options={{headerShown: false}}/> */}
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
        <Stack.Screen name="Pagamento" component={Pagamento} options={{headerShown: false}}/>
        <Stack.Screen name="QrCode" component={QRCodeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Pix" component={Pix} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
