import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPagamento";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { usePedidos } from "../context/PedidosContext";
import { Ionicons } from "@expo/vector-icons";

export default function Pagamento({ navigation, route }) {
  const cartItems = route.params?.cart || [];
  const [loading, setLoading] = useState(false);
  const { addPedidos } = usePedidos();
  const [usarCredito, setUsarCredito] = useState(false);

  const creditoUsuario = route.params?.credito ?? 100.00;

  const totalCarrinho = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantidade || 1),
    0
  );

  const totalFinal = usarCredito
    ? Math.max(totalCarrinho - creditoUsuario, 0)
    : totalCarrinho;

  // Função para finalizar o pagamento
  const finalizarPagamento = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione produtos antes de finalizar o pagamento"
      );
      return;
    }

    setLoading(true);

    try {
      // Solicitar permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Autorize o acesso à localização nas configurações do seu aparelho para continuar."
        );
        setLoading(false);
        return;
      }

      let localizacao = null;
      let localNome = "Local desconhecido";

      // Obter localização e converter em nome legível
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const [reverseGeocode] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        localizacao = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        if (reverseGeocode) {
          localNome = `${reverseGeocode.street || "Rua desconhecida"}, ${
            reverseGeocode.city || "Cidade desconhecida"
          }`;
        }
      } catch (err) {
        console.warn("AVISO: Não foi possível obter a localização.", err);
      }

      // Preparar dados do pedido
      const produtosParaPedido = cartItems.map((item) => ({
        nome: item.name,
        preco: item.price,
        quantidade: item.quantidade || 1,
        local: localNome,
      }));

      // Adiciona no contexto
      addPedidos(produtosParaPedido);

      Alert.alert("Pix", "Pagamento realizado com sucesso!");
      setTimeout(() => {
        navigation.navigate("Main", {
          screen: "Pedido",
          params: { localizacao },
        });
      }, 200);
    } catch (error) {
      console.error("Erro crítico no processo de pagamento:", error);
      Alert.alert("Erro", "Ocorreu um problema inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  async function openGoogleWallet() {
    try {
      const googleIntent =
        "intent:#Intent;package=com.google.android.apps.walletnfcrel;end";
      const supported = await Linking.canOpenURL(googleIntent);
      if (supported) {
        await Linking.openURL(googleIntent);
      } else {
        await Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.google.android.apps.walletnfcrel"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Google Wallet:", err);
      Alert.alert("Ops", "Não foi possível abrir o Google Pay.");
    }
  }

  async function openSamsungPay() {
    try {
      const samsungScheme = "samsungpay://";
      const supported = await Linking.canOpenURL(samsungScheme);

      if (supported) {
        await Linking.openURL(samsungScheme);
      } else {
        await Linking.openURL(
          "https://play.google.com/store/apps/details?id=com.samsung.android.spay"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Samsung Pay:", err);
      Alert.alert("Não foi possível abrir o Samsung Pay.");
    }
  }

  async function openApplePay() {
    try {
      const scheme = "shoebox://";
      const supported = await Linking.canOpenURL(scheme);
      if (supported) {
        await Linking.openURL(scheme);
      } else {
        await Linking.openURL(
          "https://apps.apple.com/app/apple-wallet/id915056765"
        );
      }
    } catch (err) {
      console.log("Erro abrindo Apple Pay:", err);
      Alert.alert("Ops", "Não foi possível abrir o Apple Pay.");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Realizar pagamento" color="white" />
      </Appbar.Header>

      <View style={styles.container}>
        <Ionicons
          name="card-outline"
          size={120}
          color="#000"
          style={styles.iconPay}
        />
        <Text style={styles.pagamentoText}>Pagamento</Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            backgroundColor: usarCredito ? "#d1f0d1" : "#f1f1f1",
            borderRadius: 8,
            marginBottom: 20,
          }}
          onPress={() => setUsarCredito(!usarCredito)}
        >
          <Ionicons
            name={usarCredito ? "checkbox" : "square-outline"}
            size={24}
            color={usarCredito ? "green" : "black"}
          />
          <Text style={styles.textContent}>
            Crédito Disponível R$ {creditoUsuario.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContent}
          onPress={finalizarPagamento}
        >
          <Image
            source={require("../assets/ic_pix.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>
            {loading ? "Processando..." : "PIX"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContent} onPress={openSamsungPay}>
          <Image
            source={require("../assets/ic_samsung.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Samsung Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContent}
          onPress={openGoogleWallet}
        >
          <Image
            source={require("../assets/ic_google.png")}
            style={styles.iconContent}
          />
          <Text style={styles.textContent}>Google Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContent} onPress={openApplePay}>
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
