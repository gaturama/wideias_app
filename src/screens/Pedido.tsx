import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";
import { usePedidos } from "../context/PedidosContext";
import { Ionicons } from "@expo/vector-icons";

interface Localizacao {
  latitude: number;
  longitude: number;
}

export default function Pedido({ navigation, route }) {
  const { pedidos } = usePedidos();
  const localizacao: Localizacao | undefined = route.params?.localizacao;
  const credito = route.params?.credito ?? 100.0;

  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  const totalValor = pedidos.reduce(
    (sum, p) => sum + (p.preco || 0) * p.quantidade,
    0
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.head}>
        <Appbar.Content title="Home" color="white" />
        <Appbar.BackAction
          onPress={() => navigation.navigate("Login")}
          color="white"
        />
        <TouchableOpacity onPress={handlePerfil}>
          <Ionicons name="person" size={30} color="white" style={styles.iconPerfil} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => navigation.navigate("QrScanner")}
        >
          <Ionicons name="qr-code" size={30} color="white" />
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
          keyExtractor={(item, index) => item.nome + index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("QrCode", {
                  pedido: {
                    id: "fakeId" + Date.now(),
                    usuario: "Gabriel",
                    produtos: pedidos,
                    valorTotal: totalValor,
                    localizacao,
                  },
                })
              }
            >
              <Image
                source={require("../assets/ic_product.png")}
                style={styles.icon}
              />

              <View>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.subtitle}>
                  Quantidade: {item.quantidade}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
