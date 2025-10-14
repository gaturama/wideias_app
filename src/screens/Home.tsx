import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { styles } from "../styles/stylesHome";

//Mockup de produtos para teste

const mockProdutosRestaurante = [
  {
    id: "1",
    name: "Hamburguer",
    price: 24.9,
    image: require("../assets/ic_burguer.png"),
  },
  {
    id: "2",
    name: "Pizza",
    price: 49.9,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "3",
    name: "Suco Natural",
    price: 8.5,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "4",
    name: "Prato Feito",
    price: 32.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "5",
    name: "Refrigerante",
    price: 6.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "6",
    name: "Sushi",
    price: 34.0,
    image: require("../assets/ic_product.png"),
  },
];

const mockProdutosEvento = [
  {
    id: "1",
    name: "Cerveja",
    price: 8.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "2",
    name: "Whisky",
    price: 21.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "3",
    name: "Tônica",
    price: 5.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "4",
    name: "Água sem gás",
    price: 2.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "5",
    name: "Água com gás",
    price: 2.5,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "6",
    name: "Sorvete",
    price: 7.5,
    image: require("../assets/ic_product.png"),
  },
];

export default function Home({ navigation, route }) {
  const [cart, setCart] = useState([]);
  const [localizacao, setLocalizacao] = useState<string | null>(null);

  const tipoLocal = route?.params?.tipo || "restaurante";
  const produtos =
    tipoLocal === "evento" ? mockProdutosEvento : mockProdutosRestaurante;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") return;

        const pos = await Location.getCurrentPositionAsync({});
        const [endereco] = await Location.reverseGeocodeAsync({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        if (endereco) {
          const cidade = endereco.city || endereco.subregion || "";
          const estado = endereco.region || "";
          setLocalizacao(`${cidade} - ${estado}`);
        }
      } catch (error) {
        console.log("Erro ao obter localização:", error);
      }
    })();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  const handleCredit = () => {
    navigation.navigate("Credito");
  };

  // Função para renderizar os produtos teste e adicionar ao card flutuante na tela de Home

  const renderProduct = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image
        source={require("../assets/ic_product.png")}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.navigate("Login")} color="white"/>
        <Appbar.Content title="Home" color="white"/>
        <TouchableOpacity onPress={handlePerfil}>
          <Image
            source={require("../assets/ic_user.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCredit}>
          <Image
            source={require("../assets/ic_moeda.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Appbar.Header>

      {localizacao && <Text style={styles.local}>📍{localizacao}</Text>}

      <Text style={styles.headerTitle}>Wideias App</Text>

      {/* Lista dos produtos */}
      <FlatList
        data={produtos}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartFooter}
          onPress={() => {
            if (tipoLocal === "evento") {
              navigation.navigate("Carrinho", { cart });
          } else {
            navigation.navigate("DescricaoProduto", { produtos, cart, tipoLocal: "restaurante" })
          }
        }}
        >
          <Text style={styles.cartText}>
            {cart.length} item{cart.length > 1 && "s"} • Total: R${" "}
            {total.toFixed(2)}
          </Text>
          <Text style={styles.cartAction}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
