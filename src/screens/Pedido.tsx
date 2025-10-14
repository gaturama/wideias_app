import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";

export default function Pedido({ navigation, route }) {
  const pedidos = route.params?.pedidos || [];
  const credito = route.params?.credito ?? 100.0;

  const handlePerfil = () => {
    navigation.navigate("Perfil");
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
          <Image
            source={require("../assets/ic_user.png")}
            style={styles.iconPerfil}
          />
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
              onPress={() => navigation.navigate("QrCode", { pedido: item })}
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
