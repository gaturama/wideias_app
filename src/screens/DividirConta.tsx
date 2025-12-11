import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/stylesDividirConta";
import QRCode from "react-native-qrcode-svg";

export default function DividirConta({ route }) {
  const { pedidoId, valorTotal } = route.params;
  const [numPessoas, setNumPessoas] = useState(2);

  const valorPorPessoa = (valorTotal / numPessoas).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dividir em {numPessoas} pessoas</Text>
      <Text style={[styles.title, { marginBottom: 40 }]}>
        Valor por pessoa: R$ {valorPorPessoa}
      </Text>

      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify({ idPedido: pedidoId, valor: valorPorPessoa })}
          size={220}
        />
      </View>

      <TouchableOpacity
        onPress={() => setNumPessoas(numPessoas + 1)}
        style={styles.button}
      >
        <Text style={styles.textButton}>Adicionar mais pessoas</Text>
      </TouchableOpacity>
    </View>
  );
}