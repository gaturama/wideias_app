import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesCredito";
import { Ionicons } from "@expo/vector-icons";
import { useCredito } from "../context/CreditoContext";

export default function Credito({ navigation }) {
  const [valor, setValor] = useState<string>("");
  const [saldo, setSaldo] = useState<number>(50.0);
  const { credito, adicionarCredito } = useCredito();

  // Mockup de adicionar saldo
  const addSaldoMock = (valor: number) => {
    adicionarCredito(valor);
    Alert.alert(
      "Sucesso", 
      `R$ ${valor.toFixed(2)} adicionados ao seu saldo!`
    );
  };

  // Função para adicionar crédito ao saldo
  const handleAdicionarCredito = () => {
    const valorNum = parseFloat(valor);
    if (!valorNum || valorNum <= 0) {
      Alert.alert("Erro", "Digite um valor válido para adicionar crédito.");
      return;
    }
    adicionarCredito(valorNum);
    Alert.alert(
      "Sucesso",
      `R$ ${valorNum.toFixed(2)} adicionados ao seu saldo!`
    );
    setValor("");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.Content title="Adicionar Crédito" color="white" />
      </Appbar.Header>

      <View style={styles.container}>
        <Ionicons
          name="wallet-outline"
          size={100}
          color="#000"
          style={styles.iconPay}
        />

        {/* Botões de valores pré-definidos */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          {[20, 50, 100].map((valor) => (
            <TouchableOpacity
              key={valor}
              style={[styles.buttonCredito, { paddingHorizontal: 15 }]}
              onPress={() => addSaldoMock(valor)}
            >
              <Text style={styles.textSaldo}>R$ {valor} </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input para valor customizado */}
        <TextInput
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          style={styles.textValue}
        />

        {/* Botões de carteiras digitais e PIX */}
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={handleAdicionarCredito}
        >
          <Image
            source={require("../assets/ic_pix.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>PIX</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContent}>
          <Image
            source={require("../assets/ic_samsung.png")}
            style={[styles.iconContent, { backgroundColor: "#F5F5F5" }]}
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
