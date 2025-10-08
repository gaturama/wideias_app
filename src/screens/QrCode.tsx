import React from "react";
import { styles } from "../styles/stylesQrCode";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMesa } from "../context/MesaContext";

{/* Função para gerar o QR Code */}
export default function QRCodeScreen({ route }) {
  const { pedido } = route.params;
  const { mesa } = useMesa();

  if (!pedido) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhum pedido encontrado!</Text>
      </View>
    );
  }

  const qrData = JSON.stringify({
    pedidoId: pedido.id,
    usuario: pedido.usuario,
    produtos: pedido.produtos.map((p) => p.nome),
    valorTotal: pedido.valorTotal,
    mesa: mesa,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Mostre este QR Code no balcão</Text>
          <View style={styles.qrContainer}>
            <QRCode value={qrData} size={220} />
          </View>
          <Text style={styles.info}>Pedido #{pedido.id}</Text>
          <Text style={styles.subtext}>Mesa: {mesa}</Text>
          <Text style={styles.subtext}>
            Total: R$ {pedido.valorTotal.toFixed(2)}
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
