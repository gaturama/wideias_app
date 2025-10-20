import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPagamento";
import { RootStackParamList } from "../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { usePedidos, Pedido as PedidoType } from "../context/PedidosContext";

type Props = NativeStackScreenProps<RootStackParamList, "Pagamento">;

export default function Pagamento({ navigation, route }: Props) {
  const cartItems = route.params?.cart || [];
  const [loading, setLoading] = useState(false);
  const { addPedidos } = usePedidos();

  // Função para finalizar o pagamento
  const finalizarPagamento = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione produtos antes de finalizar o pagamento"
      );
      return;
    }

    setLoading(true);

    // Solicitar permissão de localização
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Autorize o acesso à localização nas configurações do seu aparelho para continuar."
        );
        setLoading(false);
        return;
      }

      let localizacao = null;

      // Obter localização com timeout
      try {
        const locationPromise = Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const timeoutPromise = new Promise<Location.LocationObject>(
          (_, reject) =>
            setTimeout(
              () => reject(new Error("Localização: tempo limite excedido")),
              5000
            )
        );
        const location = await Promise.race([locationPromise, timeoutPromise]);

        localizacao = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      } catch (err) {
        console.warn(
          "AVISO: Não foi possível obter a localização. O pedido prosseguirá sem ela.",
          err
        );
      }

      // Preparar dados do pedido
      const produtosParaPedido = cartItems.map((item) => ({
        nome: item.name,
        preco: item.price,
        quantidade: item.quantidade || 1,
      }));

      addPedidos(produtosParaPedido)

      Alert.alert("Pix", "Pagamento realizado com sucesso!");
      setTimeout(() => {
        navigation.navigate("Main", { screen: "Pedido" });
      }, 200);
      
    } catch (error) {
      console.error("Erro crítico no processo de pagamento:", error);
      Alert.alert("Erro", "Ocorreu um problema inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Funções para abrir carteiras digitais
  async function openGoogleWallet() {
    try {
      const googleIntent =
        "intent:#Intent;package=com.google.android.apps.walletnfcrel;end";
      const supported = await Linking.canOpenURL(googleIntent);
      if (supported) {
        await Linking.openURL(googleIntent);
      } else {
        await Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Google Wallet:", err);
      Alert.alert("Ops", "Não foi possível abrir o Google Pay.");
    }
  }

  async function openSamsungPay() {
    try {
      const samsungScheme = "samsungpay://";
      const supported = await Linking.canOpenURL(samsungScheme);

      if (supported) {
        await Linking.openURL(samsungScheme);
      } else {
        await Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.samsung.android.spay"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Samsung Pay:", err);
      Alert.alert("Não foi possível abrir o Samsung Pay.");
    }
  }

  async function openApplePay() {
    try {
      const scheme = "shoebox://";
      const supported = await Linking.canOpenURL(scheme);
      if (supported) {
        await Linking.openURL(scheme);
      } else {
        await Linking.openURL(
          "https://apps.apple.com/app/apple-wallet/id915056765"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Apple Pay:", err);
      Alert.alert("Ops", "Não foi possível abrir o Apple Pay.");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Realizar pagamento" color="white" />
      </Appbar.Header>
      <View style={styles.container}>
        <Image
          source={require("../assets/ic_pagamento.png")}
          style={styles.iconPay}
        />
        <Text style={styles.pagamentoText}>Pagamento</Text>

        {/* Botões de carteiras digitais e PIX */}
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={finalizarPagamento}
        >
          <Image
            source={require("../assets/ic_pix.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>PIX</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContent} onPress={openSamsungPay}>
          <Image
            source={require("../assets/ic_samsung.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Samsung Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={openGoogleWallet}
        >
          <Image
            source={require("../assets/ic_google.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Google Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContent} onPress={openApplePay}>
          <Image
            source={require("../assets/ic_apple.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Apple Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
