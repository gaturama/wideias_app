import { useState } from "react";
import { Alert, Clipboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/stylesPix";
import QRCode from "react-native-qrcode-svg";

export default function Pix({ route }) {
  const { pedido } = route.params;

  const [pixCode] = useState(
    `00020126580014BR.GOV.BCB.PIX0136chavepix@empresa.com520400005303986540${pedido.valorTotal
      .toFixed(2)
      .replace(".", "")}5802BR5912Wideias App6009Joinville62070503***6304ABCD`
  );

  const handleCopy = () => {
    Clipboard.setString(pixCode);
    Alert.alert(
      "Copiado!",
      "O código Pix foi copiado para a área de transferência."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento via PIX</Text>

      <View style={styles.qrContainer}>
        <QRCode value={pixCode} size={220} />
      </View>

      <Text style={styles.amount}>
        Total: R$ {pedido.valorTotal.toFixed(2)}
      </Text>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
        <Text style={styles.copyText}>Copiar código Pix</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>ou</Text>

      <Text style={styles.infoText}>
        Escaneie o QR Code no app do seu banco para concluir o pagamento.
      </Text>
    </View>
  );
}
