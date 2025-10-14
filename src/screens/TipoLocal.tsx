import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/stylesTipoLocal";

export default function TipoLocal({ navigation, route }) {
  const { location } = route.params;

  // Função para navegar para a tela Home com o tipo selecionado
  const handleEscolha = (tipo) => {
    navigation.navigate("Main", {
      screen: "Home",
      params: { tipo, location },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textLocal}>Onde você está?</Text>

      {/* Botões para escolher o tipo de local */}
      <TouchableOpacity
        style={styles.buttonLocal}
        onPress={() => handleEscolha("restaurante")}
      >
        <Text style={styles.textButton}>Restaurante</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLocal}
        onPress={() => handleEscolha("evento")}
      >
        <Text style={styles.textButton}>Evento</Text>
      </TouchableOpacity>
    </View>
  );
}
