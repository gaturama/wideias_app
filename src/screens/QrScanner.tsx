import React, { useEffect, useState } from "react";
import { usePedidos } from "../context/PedidosContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { styles } from "../styles/stylesQrScanner";

export default function QrScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { addPedidos } = usePedidos();

  // Solicitar permissão da câmera ao montar o componente
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <Text>Verificando permissões da câmera</Text>;
  }

  // Se a permissão não foi concedida, solicitar ao usuário
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos da permissão da câmera!</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Função chamada quando um código de barras/QR é escaneado
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    // Tentar interpretar os dados do QR Code como uma URL com parâmetros
    try {
      const url = new URL(data);
      const mesa = url.searchParams.get("mesa");
      const latitude = url.searchParams.get("lat");
      const longitude = url.searchParams.get("lng");

      Alert.alert(
        "Mesa identificada!",
        `Mesa: ${mesa}\nLatitude: ${latitude}\nLongitude: ${longitude}`,
        [
          {
            // Adicionar lógica para navegar ou salvar a mesa conforme necessário
            text: "OK",
            onPress: () => navigation.navigate("Main", { screen: "Pedido" }),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro ao ler QR Code", "O QR Code escaneado é inválido.");
      setScanned(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Quadrado central de leitura */}
      <View
        style={{
          width: 320,
          height: 320,
          overflow: "hidden",
          borderRadius: 20,
          borderWidth: 2,
          borderColor: "#11658f",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Componente da câmera para escanear QR Codes */}
        <CameraView
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          style={{
            width: 320,
            height: 320,
          }}
        />
      </View>

      {scanned && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Escanear novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
