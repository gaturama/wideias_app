import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useMesa } from "../context/MesaContext";
import { styles } from "../styles/stylesMesa";

export default function Mesa({ navigation }) {
  const { setMesa } = useMesa();
  const [mesaLocal, setMesaLocal] = useState("");

  const handleConfirm = () => {
    if (!mesaLocal) {
      Alert.alert("Informe o número da mesa!");
      return;
    }
    setMesa(mesaLocal);
    Alert.alert("Mesa selecionada!", `Você escolheu a mesa ${mesaLocal}`);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe sua mesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        keyboardType="numeric"
        value={mesaLocal}
        onChangeText={setMesaLocal}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
