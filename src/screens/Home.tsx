import { styles } from "../styles/stylesHome";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const dummyProducts = [
  {
    id: "1",
    name: "Hambúrguer",
    price: 25.9,
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
];

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props) {
  const renderProduct = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={require("../assets/ic_product.png")} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleLogin}>
          <Image
            style={styles.image}
            source={require("../assets/ic_loggout.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wideias APP</Text>

        <FlatList
          data={dummyProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productsGrid}
          renderItem={renderProduct}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
