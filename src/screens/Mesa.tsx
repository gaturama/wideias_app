import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useMesa } from "../context/MesaContext";
import { styles } from "../styles/stylesMesa";

export default function Mesa({ navigation, route }) {
  const { setMesa } = useMesa();
  const [mesaLocal, setMesaLocal] = useState("");
  const tipoLocal = route.params?.tipoLocal;

  // Função para informar o número da mesa
  const handleConfirm = () => {
    if (!mesaLocal) {
      Alert.alert("Informe o número da mesa!");
      return;
    }
    setMesa(mesaLocal);
    Alert.alert("Mesa selecionada!", `Você escolheu a mesa ${mesaLocal}`);
    navigation.navigate("Pagamento", { tipoLocal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe sua mesa</Text>
      {/* Input da mesa */}
      <TextInput
        style={styles.input}
        placeholder="MESA"
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
