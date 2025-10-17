import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPedido";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

interface PedidoItem {
  nome: string;
  preco?: number;
  quantidade: number;
}

interface Localizacao {
  latitude: number;
  longitude: number;
}
export default function Pedido({ navigation, route }) {
  const [pedidos, setPedidos] = useState<PedidoItem[]>([]);
  const novosPedidos: PedidoItem[] = route.params?.pedidos || [];
  const localizacao: Localizacao | undefined = route.params?.localizacao;
  const credito = route.params?.credito ?? 100.0;

  // Atualiza a lista de pedidos quando novos pedidos são recebidos
  useEffect(() => {
    if (novosPedidos.length > 0) {
      setPedidos((prev) => {
        const atualizado = [...prev];

        novosPedidos.forEach((novo) => {
          const existente = atualizado.find((p) => p.nome === novo.nome);
          if (existente) {
            existente.quantidade += novo.quantidade;

            existente.preco = novo.preco ?? existente.preco; 
          } else {
            atualizado.push(novo);
          }
        });

        return atualizado;
      });
      navigation.setParams({ pedidos: undefined });
    }
  }, [novosPedidos]);

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
