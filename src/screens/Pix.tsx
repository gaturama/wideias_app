import { useState } from "react";
import { Alert, Clipboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/stylesPix";
import QRCode from "react-native-qrcode-svg";
import CustomAlert from "../components/CustomAlert";

export default function Pix({ route }) {
  const { pedido } = route.params;

  // Mockup do qr code para teste
  const [pixCode] = useState(
    `00020126580014BR.GOV.BCB.PIX0136chavepix@empresa.com520400005303986540${pedido.valorTotal
      .toFixed(2)
      .replace(".", "")}5802BR5912Wideias App6009Joinville62070503***6304ABCD`,
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOnConfirmm, setAlertOnConfirm] = useState<(() => void) | null>(
    null,
  );

  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void,
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm || (() => setAlertVisible(false)));
    setAlertVisible(true);
  };

  // Função para copiar para área de transferênciar o código do QR Code
  const handleCopy = () => {
    Clipboard.setString(pixCode);
    showAlert(
      "Copiado!",
      "O código Pix foi copiado para a área de transferência.",
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

      <CustomAlert 
        isVisible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          if (alertOnConfirmm) {
            alertOnConfirmm();
          } else {
            setAlertVisible(false);
          }
        }}      
        confirmText="OK"
      />
    </View>
  );
}
