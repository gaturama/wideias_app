import { FlatList, Image, Text, View } from "react-native";
import { usePedidos } from "../context/PedidosContext";
import { styles } from "../styles/stylesHistorico";
import { Appbar } from "react-native-paper";

export default function Historico({ navigation }) {
  const { historico } = usePedidos();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Histórico de Pedidos" color="white" />
      </Appbar.Header>

      {historico.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Nenhum pedido finalizado ainda</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item, index) => item.nome + index}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={require("../assets/ic_product.png")}
                style={styles.icon}
              />
              <View>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.subtitle}>Qtd: {item.quantidade}</Text>
                <Text style={styles.subtitle}>
                    Valor: R$ {(item.preco ?? 0).toFixed(2)}
                </Text>
                <Text style={styles.subtitle}>Local: {item.local}</Text>
                <Text style={styles.subtitle}>Data: {item.dataHora}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
