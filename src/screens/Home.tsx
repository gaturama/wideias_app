import { styles } from "../styles/stylesHome";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Appbar } from "react-native-paper";
import { useState } from "react";

const dummyProducts = [
  {
    id: "1",
    name: "Hamburguer",
    price: 24.9,
    image: require("../assets/ic_product.png"),
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
    name: "Prato Executivo",
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
  {
    id: "7",
    name: "Cerveja",
    price: 8.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "8",
    name: "Whisky",
    price: 21.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "9",
    name: "Tônica",
    price: 5.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "10",
    name: "Água sem gás",
    price: 2.0,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "11",
    name: "Água com gás",
    price: 2.5,
    image: require("../assets/ic_product.png"),
  },
  {
    id: "12",
    name: "Sorvete",
    price: 7.5,
    image: require("../assets/ic_product.png"),
  },
];

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const renderProduct = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={require("../assets/ic_product.png")} />
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

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={handlePerfil}>
          <Image
            source={require("../assets/ic_user.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </Appbar.Header>

      <Text style={styles.headerTitle}>Wideias App</Text>

      <FlatList
        data={dummyProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.cartFooter}
          onPress={() => navigation.navigate("DescricaoProduto")}
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
