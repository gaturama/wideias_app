import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "../styles/stylesCarrinho";
import { Appbar } from "react-native-paper";
import { supabase } from "../../utils/supabase";

export default function Carrinho({ navigation, route }: any) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const tipoLocal = route.params?.tipoLocal;
  const eventId = route.params?.eventId;
  const locationId = route.params?.locationId;

  useEffect(() => {
    if (route.params?.cart && Array.isArray(route.params.cart)) {
      const items = route.params.cart.map((item, index) => ({
        ...item,
        qty: item.qty || 1,
        cartEntryId:
          item.cartEntryId || `${item.id}-${Date.now()}-${index}`,
      }));
      setCartItems(items);
    }
  }, [route.params?.cart]);

  const handleIncrease = (cartEntryId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartEntryId === cartEntryId
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const handleDecrease = (cartEntryId: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartEntryId === cartEntryId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleEdit = (item: any) => {
    const editIndex = cartItems.findIndex(
      (p) => p.cartEntryId === item.cartEntryId
    );

    navigation.navigate("DescricaoProduto", {
      produto: item,
      produtoEditado: item,
      cart: cartItems,
      tipoLocal,
      eventId,
      locationId,
      editIndex,
      editar: true,
    });
  };

  const handleAddMoreProducts = () => {
    // Voltar para a tela de produtos mantendo o carrinho
    navigation.navigate("Produto", {
      tipo: tipoLocal,
      eventId,
      locationId,
      cart: cartItems,
    });
  };

  const handleProximo = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos antes de continuar");
      return;
    }

    if (tipoLocal === "restaurante") {
      navigation.navigate("Mesa", {
        cart: cartItems,
        tipoLocal,
        eventId,
        locationId,
        observacoes,
        total,
      });
    } else {
      // Ir direto para pagamento
      navigation.navigate("Pagamento", {
        cart: cartItems,
        tipoLocal,
        eventId,
        locationId,
        observacoes,
        total,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Carrinho" color="#fff" />
      </Appbar.Header>

      {cartItems.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity
            style={[styles.nextButton, { marginTop: 20 }]}
            onPress={handleAddMoreProducts}
          >
            <Text style={styles.nextButtonText}>Adicionar Produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartEntryId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  {/* INGREDIENTES REMOVIDOS */}
                  {item.ingredientes_removidos?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {item.ingredientes_removidos.map((ing: any) => (
                        <Text
                          key={ing.id}
                          style={{ fontSize: 12, color: "#B00020" }}
                        >
                          – Sem {ing.nome}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* ADICIONAIS */}
                  {item.adicionais?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {item.adicionais.map((add: any) => (
                        <Text
                          key={add.id}
                          style={{ fontSize: 12, color: "#2E7D32" }}
                        >
                          + {add.nome} (R$ {add.preco.toFixed(2)})
                        </Text>
                      ))}
                    </View>
                  )}

                  {item.observacao ? (
                    <Text style={styles.itemObservation}>
                      Obs: {item.observacao}
                    </Text>
                  ) : null}

                  <Text style={styles.itemPrice}>
                    R$ {item.price.toFixed(2)}
                  </Text>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleDecrease(item.cartEntryId)}
                  >
                    <Text style={styles.qtySymbol}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.qty}</Text>

                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleIncrease(item.cartEntryId)}
                  >
                    <Text style={styles.qtySymbol}>＋</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Botão para adicionar mais produtos */}
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={handleAddMoreProducts}
          >
            <Text style={styles.addMoreButtonText}>
              + Adicionar mais produtos
            </Text>
          </TouchableOpacity>

          <View style={styles.obsContainer}>
            <Text style={styles.obsLabel}>Observações</Text>
            <TextInput
              style={styles.obsInput}
              placeholder="Adicionar observação"
              value={observacoes}
              onChangeText={setObservacoes}
              multiline
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total:{" "}
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </Text>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleProximo}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.nextButtonText}>
                  {tipoLocal === "restaurante"
                    ? "Escolher Mesa"
                    : "Ir para Pagamento"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}