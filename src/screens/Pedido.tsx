import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";
import { useEffect, useState } from "react";

let pedidosGlobais: any[] = [];

export default function Pedido({ navigation, route }) {
  const [pedidos, setPedidos] = useState<any[]>(pedidosGlobais);
  const novosPedidos = route.params?.pedidos || [];
  const credito = route.params?.credito ?? 100.0;

  useEffect(() => {
    if (novosPedidos.length > 0) {
      const novos = novosPedidos.filter(
        (novo) => !pedidosGlobais.some((antigo) => antigo.nome === novo.nome)
      );

      pedidosGlobais = [...pedidosGlobais, ...novos];
      setPedidos(pedidosGlobais);

      navigation.setParams({ pedidos: undefined });
    }
  }, [route.params?.pedidos]);

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
              onPress={() =>
                navigation.navigate("QrCode", {
                  pedido: {
                    id: "fakeId" + item.nome,
                    usuario: "Gabriel",
                    produtos: [item],
                    valorTotal: item.preco || 0,
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
