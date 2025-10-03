import { useState } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { styles } from "../styles/stylesCard";

export default function ProductCard() {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, pressed && styles.cardPressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/ic_product.png")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>Produto</Text>
        <Text style={styles.description}>
            Descrição do produto, detalhes e informações adicionais.
        </Text>
        <Text style={styles.price}>R$ 99,99</Text>
      </View>
    </TouchableOpacity>
  );
}
