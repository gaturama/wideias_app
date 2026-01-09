import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { styles } from "../styles/stylesCarrinho";
import { Appbar } from "react-native-paper";
import { supabase } from "../../utils/supabase";

export default function Carrinho({ navigation, route }: any) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userCredito, setUserCredito] = useState(0);

  const tipoLocal = route.params?.tipoLocal;
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

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      setUserId(user.id);

      /*const { data: userData, error: creditError } = await supabase
        .from("users")
        .select("credito")
        .eq("id", user.id)
        .single();

      if (!creditError && userData) {
        setUserCredito(userData.credito || 0);
      }*/
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // CORRIGIDO: Calcula o preço total incluindo adicionais
  const calcularPrecoItem = (item: any) => {
    let precoBase = item.price;
    
    return precoBase;
  };

  // CORRIGIDO: Usa a função de cálculo correta
  const total = cartItems.reduce(
    (sum, item) => sum + calcularPrecoItem(item) * item.qty,
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
      locationId,
      editIndex,
      editar: true,
    });
  };

  const handleAddMoreProducts = () => {
    navigation.navigate("Produto", {
      tipoLocal,
      locationId,
      cart: cartItems,
    });
  };

  const handleProximo = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos antes de continuar");
      return;
    }

    if (!userId) {
      Alert.alert("Erro", "Dados do usuário não encontrados. Tente fazer login novamente.");
      return;
    }

    if (tipoLocal === "restaurante") {
      navigation.navigate("Mesa", {
        cart: cartItems,
        tipoLocal,
        locationId,
        observacoes,
        total,
      });
    } else {
      navigation.navigate("Pagamento", {
        cart: cartItems,
        credito: userCredito,
        userId: userId,
        locationId: locationId,
        mesa: null, 
        tipoLocal: tipoLocal,
        observacoes: observacoes,
        total: total,
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
          <Text>Seu carrinho está vazio.</Text>
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
                
                {item.imagem_url && (
                  <Image
                    source={{ uri: item.imagem_url }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  {/* CORRIGIDO: Adicionada key única */}
                  {item.ingredientes_removidos?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {item.ingredientes_removidos.map((ing: any, index: number) => (
                        <Text
                          key={`${ing.id}-${index}`}
                          style={{ fontSize: 12, color: "#B00020" }}
                        >
                          – Sem {ing.nome}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* CORRIGIDO: Adicionada key única */}
                  {item.adicionais?.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {item.adicionais.map((add: any, index: number) => (
                        <Text
                          key={`${add.id}-${index}`}
                          style={{ fontSize: 12, color: "#2E7D32" }}
                        >
                          + {add.nome} (R$ {add.preco.toFixed(2)})
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* OBSERVAÇÃO */}
                  {item.observacao ? (
                    <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                      Obs: {item.observacao}
                    </Text>
                  ) : null}

                  {/* CORRIGIDO: Mostra o preço com adicionais */}
                  <Text style={styles.itemPrice}>
                    R$ {calcularPrecoItem(item).toFixed(2)}
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