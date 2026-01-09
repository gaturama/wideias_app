import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
//import { useCredito } from "../context/CreditoContext";


interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  observations: string | null;
  custom: any;
  products: {
    id: string;
    name: string;
    image_url: string;
  };
  orders: {
    id: string;
    payment_method: string;
    mesa: string | null;
    locations: {
      id: string;
      name: string;
      address: string;
    };
  };
}

export default function Pedido({ navigation, route }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [credito, setCredito] = useState(0);

  const carregarPedidos = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

     /* const { data: profile } = await supabase
        .from("profiles")
        .select("credito")
        .eq("id", user.id)
        .single();

      if (profile) {
        setCredito(profile.credito || 0);
      }*/

      const { data, error } = await supabase
        .from("order_items")
        .select(`
          *,
          products (
            id,
            name,
            image_url
          ),
          orders!inner (
            id,
            user_id,
            status,
            payment_method,
            mesa,
            locations (
              id,
              name,
              address
            )
          )
        `)
        .eq("orders.user_id", user.id)
        .eq("orders.status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrderItems(data || []);
    } catch (error: any) {
      console.error("Erro ao carregar pedidos:", error);
      Alert.alert("Erro", "Não foi possível carregar os pedidos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    carregarPedidos();
  };


  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  const handleRetirada = async (item: OrderItem) => {
    Alert.alert(
      "Confirmar retirada",
      `Você está retirando "${item.products?.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              const { data: allItems } = await supabase
                .from("order_items")
                .select("id")
                .eq("order_id", item.order_id);

              if (allItems && allItems.length === 1) {
                const { error } = await supabase
                  .from("orders")
                  .update({ status: "completed" })
                  .eq("id", item.order_id);

                if (error) throw error;
              } else {
                const { error } = await supabase
                  .from("orders")
                  .update({ status: "completed" })
                  .eq("id", item.order_id);

                if (error) throw error;
              }

              Alert.alert(
                "Pedido retirado",
                "Esse pedido foi movido para histórico!"
              );
              
              carregarPedidos();
              navigation.navigate("Historico");
            } catch (error: any) {
              console.error("Erro ao concluir pedido:", error);
              Alert.alert("Erro", "Não foi possível concluir o pedido");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.head}>
        <Appbar.Content title="Home" color="white" />
        <Appbar.BackAction
          onPress={() => navigation.navigate("Login")}
          color="white"
        />
        <TouchableOpacity onPress={handlePerfil}>
          <Ionicons
            name="person"
            size={28}
            color="white"
            style={styles.iconPerfil}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => navigation.navigate("QrScanner")}
        >
          <Ionicons name="qr-code" size={28} color="white" />
        </TouchableOpacity>
      </Appbar.Header>

      <View style={styles.cardCredito}>
        <Text style={styles.labelCredito}>Crédito disponível</Text>
        <Text style={styles.valorCredito}>R$ {credito.toFixed(2)}</Text>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={[styles.emptyText, { marginTop: 12 }]}>
            Carregando pedidos...
          </Text>
        </View>
      ) : orderItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum pedido pendente</Text>
          <TouchableOpacity
            onPress={onRefresh}
            style={{ marginTop: 16, padding: 12, backgroundColor: "#000", borderRadius: 8 }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orderItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                onPress={() =>
                  navigation.navigate("QrCode", {
                    pedido: {
                      id: item.order_id,
                      usuario: "Usuário",
                      produtos: [item],
                      valorTotal: item.price * item.quantity,
                      localizacao: item.orders?.locations,
                    },
                  })
                }
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.products?.name || "Produto"}</Text>
                  <Text style={styles.subtitle}>
                    Local: {item.orders?.locations?.name || "N/A"}
                  </Text>
                  <Text style={styles.subtitle}>
                    Quantidade: {item.quantity}
                  </Text>
                  <Text style={styles.subtitle}>
                    Valor: R$ {(item.price * item.quantity).toFixed(2)}
                  </Text>
                  {item.observations && (
                    <Text style={[styles.subtitle, { fontStyle: "italic", marginTop: 4 }]}>
                      Obs: {item.observations}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRetirada(item)}
              >
                <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}