import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";
import { usePedidos } from "../context/PedidosContext";
import { Ionicons } from "@expo/vector-icons";

interface Localizacao {
  latitude: number;
  longitude: number;
}

export default function Pedido({ navigation, route }) {
  const { pedidos, concluirPedido } = usePedidos();
  const localizacao: Localizacao | undefined = route.params?.localizacao;
  const credito = route.params?.credito ?? 100.0;

  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  const handleRetirada = (pedido) => {
    Alert.alert(
      "Confirmar retirada",
      `Você está retirando o pedido "${pedido.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            concluirPedido({
              ...pedido,
              local: "Estádio Municipal",
            });
            Alert.alert(
              "Pedido retirado",
              "Esse pedido foi movido para histórico!"
            );
            navigation.navigate("Historico");
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

      {pedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum pedido realizado ainda</Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                onPress={() =>
                  navigation.navigate("QrCode", {
                    pedido: {
                      id: item.id,
                      usuario: "Gabriel",
                      produtos: [item],
                      valorTotal: (item.preco || 0) * item.quantidade,
                      localizacao,
                    },
                  })
                }
              >
                <Image
                  source={require("../assets/ic_product.png")}
                  style={styles.icon}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.nome}</Text>
                  <Text style={styles.subtitle}>
                    Quantidade: {item.quantidade}
                  </Text>
                  <Text style={styles.subtitle}>
                    Valor: R$ {(item.preco || 0).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Botão de concluir (retirar) */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRetirada(item)}
              >
                <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}