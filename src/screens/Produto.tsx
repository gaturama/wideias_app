import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Appbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "../styles/stylesProduto";
import { supabase } from "../../utils/supabase";
import { Product } from "../types/database.types";
import { useLocation } from "../context/LocationContext";

export default function Home({ navigation, route }) {
  const { locationId, tipoLocal } = useLocation();
  const [cart, setCart] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const editar = route.params?.editar || false;
  const editIndex = route.params?.editIndex;

  console.log("Location ID recebida em Produto:", locationId);
  console.log(tipoLocal);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (route.params?.cart && Array.isArray(route.params.cart)) {
      setCart(route.params.cart);
    }
  }, [route.params?.cart]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("name");

      if (error) throw error;

      setProdutos(data || []);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Product) => {
    const itemCarrinho = {
      cartEntryId: `${item.id}-${Date.now()}`,
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      qty: 1,
    };

    // Adiciona o item ao carrinho sem navegar
    setCart((prevCart) => [...prevCart, itemCarrinho]);
  };

  const total = cart.reduce(
    (sum, item: any) => sum + item.price * (item.qty || 1),
    0
  );

  const totalItems = cart.reduce(
    (sum, item: any) => sum + (item.qty || 1),
    0
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      {item.image_url ? (
        <Image
          source={{ uri: item.image_url }}
          style={styles.productImage}
        />
      ) : (
        <Image
          source={require("../assets/ic_product.png")}
          style={styles.productImage}
        />
      )}

      <Text style={styles.productName}>{item.name}</Text>

      <Text style={styles.productPrice}>
        R$ {item.price.toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Image
          source={require("../assets/ic_carrinho.png")}
          style={styles.iconCarrinho}
        />
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.head}>
        <Appbar.Content title="Produtos" color="white" />
      </Appbar.Header>

      <FlatList
        data={produtos}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ 
          padding: 16, 
          paddingBottom: cart.length > 0 ? 180 : 100 
        }}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />

      {/* FOOTER DO CARRINHO */}
      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartFooter}
          onPress={() =>
            navigation.navigate("Carrinho", { 
              cart, 
              tipoLocal: tipoLocal,
              locationId: locationId,
            })
          }
        >
          <Text style={styles.cartText}>
            {totalItems} item{totalItems > 1 ? "s" : ""} • Total: R${" "}
            {total.toFixed(2)}
          </Text>
          <Text style={styles.cartAction}>Carrinho</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}