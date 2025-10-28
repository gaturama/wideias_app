import React from "react";
import { styles } from "../styles/stylesQrCode";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

type Props = {
  route: RouteProp<RootStackParamList, "QrCode">;
};

export default function QRCodeScreen({ route }: Props) {
  const pedido = route.params?.pedido;

  // Verifica se o pedido existe
  if (!pedido) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhum pedido encontrado!</Text>
      </View>
    );
  }

  // Dados para o QR Code
  const qrData = JSON.stringify({
    pedidoId: pedido.id,
    usuario: pedido.usuario,
    produtos: pedido.produtos.map((p) => p.nome),
    valorTotal: pedido.valorTotal,
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Mostre este QR Code no balcão</Text>
        <View style={styles.qrContainer}>
          {/* Gerando o QR Code */}
          <QRCode value={qrData} size={220} />
        </View>
        <Text style={styles.info}>Pedido #{pedido.id}</Text>
        <Text style={styles.subtext}>
          Total: R$ {pedido.valorTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}