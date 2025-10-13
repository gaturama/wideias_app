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

export default function Credito({ navigation }) {
  const [valor, setValor] = useState<string>("");
  const [saldo, setSaldo] = useState<number>(50.0);

  const addSaldoMock = (valor: number) => {
    setSaldo((prev) => prev + valor);
    Alert.alert("Sucesso", `R$ ${valor.toFixed(2)} adicionados ao seu saldo!`);
  };

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
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white"/>
        <Appbar.Content title="Adicionar Crédito" color="white"/>
      </Appbar.Header>

      <View style={styles.container}>
        <Image
          source={require("../assets/ic_credito.png")}
          style={styles.iconPay}
        />
        <Text style={styles.pagamentoText}>
          Saldo atual: R$ {saldo.toFixed(2)}
        </Text>

        <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
          {[20, 50, 100].map((valor) => (
            <TouchableOpacity
              key={valor}
              style={[styles.buttonCredito, { paddingHorizontal: 15 }]}
              onPress={() => addSaldoMock(valor)}
            >
              <Text style={styles.textContent}>R$ {valor} </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
          style={styles.textValue}
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
