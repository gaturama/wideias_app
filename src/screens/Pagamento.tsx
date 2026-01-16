import React, { useState, useEffect } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPagamento";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useLocation } from '../context/LocationContext';

type PagamentoParams = {
  cart: any[];
  locationId?: string;
  locationName?: string;
  observacoes?: string;
  mesa?: string;
};

export default function Pagamento({ navigation }) {
  const route = useRoute<RouteProp<{ params: PagamentoParams }, 'params'>>();
  const cartItems = route.params?.cart || [];
  const observacoes = route.params?.observacoes;
  const mesa = route.params?.mesa;
  const { locationId: contextLocationId, locationName: contextLocationName } = useLocation();

  const locationId = route.params?.locationId || contextLocationId || "";
  const localName = route.params?.locationName || contextLocationName || "";

  const [loading, setLoading] = useState(false);
  // const [usarCredito, setUsarCredito] = useState(false);
  // const [creditoUsuario, setCreditoUsuario] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    console.log("Location ID:", locationId);
    console.log("Location Name:", localName);
    console.log("Mesa:", mesa);
    console.log("Observações:", observacoes);
    console.log("Itens do carrinho:", cartItems.length);
  }, [locationId, localName, mesa, observacoes, cartItems]);


  const totalCarrinho = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // const creditoAplicado = usarCredito
  //   ? Math.min(creditoUsuario, totalCarrinho)
  //   : 0;
  // const totalFinal = totalCarrinho - creditoAplicado;
  const totalFinal = totalCarrinho;

  // useEffect(() => {
  //   carregarCredito();
  // }, []);

  // const carregarCredito = async () => {
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (!user) return;

  //     setUserId(user.id);

  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("credito")
  //       .eq("id", user.id)
  //       .single();

  //     if (error) throw error;

  //     setCreditoUsuario(data?.credito || 0);
  //   } catch (error: any) {
  //     console.error("Erro ao carregar crédito:", error);
  //   }
  // };

  const finalizarPagamento = async (paymentMethod: string) => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos antes de finalizar");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        setLoading(false);
        return;
      }


      /*let finalLocationId = locationId;
        if (!location) {
          Alert.alert("Erro", "Nenhuma localização encontrada");
          setLoading(false);
          return;
        }*/
      

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          user_id: user.id,
          location_id: locationId,
          status: "pending",
          total: totalCarrinho,
          payment_method: paymentMethod,
          observacoes: observacoes || null,
          mesa: mesa || null,
        }] as any)
        .select()
        .single() as any;

      if (orderError) throw orderError;

      if (!order) {
        Alert.alert("Erro", "Falha ao criar o pedido");
        setLoading(false);
        return;
      }

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.qty,
        price: item.price,
        observations: item.observacao || null,
        custom: JSON.stringify({
          ingredientes_removidos: item.ingredientes_removidos || [],
          adicionais: item.adicionais || [],
        }),
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // if (usarCredito && creditoAplicado > 0) {
      //   const novoCredito = creditoUsuario - creditoAplicado;
      //   const { error: creditError } = await supabase
      //     .from("profiles")
      //     .update({ credito: novoCredito })
      //     .eq("id", user.id);

      //   if (creditError) throw creditError;
      // }

      setLoading(false);
      Alert.alert(
        "Sucesso!",
        `Pedido realizado com sucesso!\n\nTotal pago: R$ ${totalFinal.toFixed(2)}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Main", {
                screen: "Pedido",
              });
            },
          },
        ]
      );
    } catch (err: any) {
      setLoading(false);
      Alert.alert("Erro", err.message);
      console.error(err);
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
      Alert.alert("Ops", "Não foi possível abrir o Samsung Pay.");
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

        <Text style={styles.totalText}>Total a pagar:</Text>
        <Text style={styles.totalValor}>R$ {totalFinal.toFixed(2)}</Text>

        {/* {creditoAplicado > 0 && (
          <View style={{ marginTop: 8, marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: "#666", textAlign: "center" }}>
              Valor do carrinho: R$ {totalCarrinho.toFixed(2)}
            </Text>
            <Text style={{ fontSize: 14, color: "#2E7D32", textAlign: "center" }}>
              Crédito aplicado: - R$ {creditoAplicado.toFixed(2)}
            </Text>
          </View>
        )} */}

        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            backgroundColor: usarCredito ? "#d1f0d1" : "#f1f1f1",
            borderRadius: 8,
            marginBottom: 20,
            opacity: creditoUsuario === 0 ? 0.5 : 1,
          }}
          onPress={() => setUsarCredito(!usarCredito)}
          disabled={creditoUsuario === 0}
        >
          <Ionicons
            name={usarCredito ? "checkbox" : "square-outline"}
            size={24}
            color={usarCredito ? "#2E7D32" : "#666"}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.textContent}>Usar Crédito Disponível</Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              R$ {creditoUsuario.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity> */}

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => finalizarPagamento("PIX")}
            >
              <Image
                source={require("../assets/ic_pix.png")}
                style={styles.iconContent}
              />
              <Text style={styles.textContent}>PIX</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => {
                openSamsungPay();
                setTimeout(() => finalizarPagamento("Samsung Pay"), 1000);
              }}
            >
              <Image
                source={require("../assets/ic_samsung.png")}
                style={styles.iconContent}
              />
              <Text style={styles.textContent}>Samsung Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => {
                openGoogleWallet();
                setTimeout(() => finalizarPagamento("Google Pay"), 1000);
              }}
            >
              <Image
                source={require("../assets/ic_google.png")}
                style={styles.iconContent}
              />
              <Text style={styles.textContent}>Google Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() => {
                openApplePay();
                setTimeout(() => finalizarPagamento("Apple Pay"), 1000);
              }}
            >
              <Image
                source={require("../assets/ic_apple.png")}
                style={styles.iconContent}
              />
              <Text style={styles.textContent}>Apple Pay</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}