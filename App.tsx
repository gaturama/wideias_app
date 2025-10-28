import React from "react";
import Pix from "./src/screens/Pix";
import Mesa from "./src/screens/Mesa";
import Login from "./src/screens/Login";
import Perfil from "./src/screens/Perfil";
import Pedido from "./src/screens/Pedido";
import Credito from "./src/screens/Credito";
import Carrinho from "./src/screens/Carrinho";
import Cadastro from "./src/screens/Cadastro";
import Pagamento from "./src/screens/Pagamento";
import QRCodeScreen from "./src/screens/QrCode";
import QrScanner from "./src/screens/QrScanner";
import Historico from "./src/screens/Historico";
import Localizacao from "./src/screens/Localizacao";
import DividirConta from "./src/screens/DividirConta";
import TabsNavigator from "./src/navigation/TabsNavigator";
import { RootStackParamList } from "./src/navigation/types";
import DescricaoProduto from "./src/screens/DescricaoProduto";
import { NavigationContainer } from "@react-navigation/native";
import { PedidosProvider } from "./src/context/PedidosContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PedidosProvider>
      <NavigationContainer>
        {/*Inicialização definida para tela de Login || Para testes, substituir para a tela desejada*/}
        <Stack.Navigator initialRouteName="Login" id={undefined}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Localizacao"
            component={Localizacao}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DescricaoProduto"
            component={DescricaoProduto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Carrinho"
            component={Carrinho}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pagamento"
            component={Pagamento}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QrCode"
            component={QRCodeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pix"
            component={Pix}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mesa"
            component={Mesa}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Credito"
            component={Credito}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pedido"
            component={Pedido}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QrScanner"
            component={QrScanner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Historico"
            component={Historico}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DividirConta"
            component={DividirConta}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PedidosProvider>
  );
}