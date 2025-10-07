import React from "react";
import { styles } from "../styles/stylesPagamento";
import { RootStackParamList } from "../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Pagamento({ navigation }: Props) {
  const pedidoTeste = {
    id: "WID-20251006-001",
    usuario: "gabriel",
    produtos: [
      { nome: "Suco de Laranja", quantidade: 2 },
      { nome: "Energético Red Bull", quantidade: 1 },
    ],
    valorTotal: 78.5,
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

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
      const samsungIntent =
        "intent:#Intent;package=com.samsung.android.spay;end";
      const supported = await Linking.canOpenURL(samsungIntent);
      if (supported) {
        await Linking.openURL(samsungIntent);
      } else {
        await Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.samsung.android.spay"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Samsung Pay:", err);
      Alert.alert("Ops", "Não foi possível abrir o Samsung Pay.");
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
      <Appbar.Header>
        <TouchableOpacity onPress={handleHome}>
          <Image
            source={require("../assets/ic_back.png")}
            style={styles.iconExit}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.container}>
        <Image
          source={require("../assets/ic_pagamento.png")}
          style={styles.iconPay}
        />
        <Text style={styles.pagamentoText}>Pagamento</Text>
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={() => navigation.navigate("Pix", { pedido: pedidoTeste })}
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
