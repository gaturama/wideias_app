import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPagamento";
import { RootStackParamList } from "../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function AdicionarCredito({ navigation }: Props) {
  const [valor, setValor] = useState<string>("");

  const [saldo, setSaldo] = useState<number>(50.0);

  const handleAdicionarCredito = () => {
    const valorNum = parseFloat(valor);
    if (!valorNum || valorNum <= 0) {
      Alert.alert("Erro", "Digite um valor válido para adicionar crédito.");
      return;
    }
    setSaldo((prev) => prev + valorNum);
    Alert.alert(
      "Sucesso",
      `R$ ${valorNum.toFixed(2)} adicionados ao seu saldo!`
    );
    setValor("");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar Crédito" />
      </Appbar.Header>

      <View style={styles.container}>
        <Image
          source={require("../assets/ic_pagamento.png")}
          style={styles.iconPay}
        />
        <Text style={styles.pagamentoText}>
          Saldo atual: R$ {saldo.toFixed(2)}
        </Text>

        <TextInput
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          style={{
            width: "80%",
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 12,
            fontSize: 18,
            marginBottom: 15,
          }}
        />

        <TouchableOpacity
          style={styles.buttonContent}
          onPress={handleAdicionarCredito}
        >
          <Image
            source={require("../assets/ic_pix.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Adicionar Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContent}>
          <Image
            source={require("../assets/ic_samsung.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Samsung Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContent}>
          <Image
            source={require("../assets/ic_google.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Google Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContent}>
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
