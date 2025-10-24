import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/stylesCarrinho";
import { Appbar } from "react-native-paper";

export default function Carrinho({ navigation, route }: any) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const tipoLocal = route.params?.tipoLocal;

  // Função p/ agrupar itens iguais do carrinho e soma a quantidade
  useEffect(() => {
    if (route.params?.cart && Array.isArray(route.params.cart)) {
      const grouped = route.params.cart.reduce((acc, item) => {
        const existing = acc.find((p) => p.id === item.id);
        if (existing) {
          existing.qty += 1;
        } else {
          acc.push({ ...item, qty: item.qty || 1 });
        }
        return acc;
      }, []);
      setCartItems(grouped);
    }
  }, [route.params?.cart]);

  // função para aumentar o número de produtos no carrinho
  const handleIncrease = (id: string, custom: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.custom === custom ?{ ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // função para diminuir o número de produtos no carrinho
  const handleDecrease = (id: string, custom: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id && item.custom === custom ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      {/* Header customizável */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white"/>
        <Appbar.Content title="Carrinho" color="#fff" />
      </Appbar.Header>

      {/* Lista para mostrar os produtos */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id + item.custom}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              {item.custom ? (
                <Text style={styles.itemCustom}>{item.custom}</Text>
              ) : null}
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>

            {/* Botões para acrescentar e diminuir qtd de produtos */}
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleDecrease(item.id, item.custom)}
              >
                <Text style={styles.qtySymbol}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyText}>{item.qty}</Text>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleIncrease(item.id, item.custom)}
              >
                <Text style={styles.qtySymbol}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

        {/* Caixa de texto para observações */}
      <View style={styles.obsContainer}>
        <Text style={styles.obsLabel}>Observações</Text>
        <TextInput
          style={styles.obsInput}
          placeholder="Adicionar observação"
          value={observacoes}
          onChangeText={setObservacoes}
        />
      </View>

        {/* Footer de toal + botão para tela de Pagamento */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (tipoLocal === "restaurante") {
              navigation.navigate("Mesa", { cart: cartItems, tipoLocal });
            } else {
              navigation.navigate("Pagamento", { cart: cartItems, tipoLocal });
            }
          }}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
