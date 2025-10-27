import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { styles } from "../styles/stylesLocalizacao";

export default function Localizacao({ navigation }) {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [endereco, setEndereco] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [loading, setLoading] = useState(true);
  const [detalhe, setDetalhe] = useState("Obtendo localização...");
  const pedidosAtuais = [];

  // Solicita permissão e obtém a localização
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada!",
            "Precisamos da sua localização para continuar"
          );
          setLoading(false);
          return;
        }

        // Tenta obter a localização com timeout
        const locResult = await Promise.race([
          Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            timeInterval: 10000,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 8000)
          ),
        ]);

        // Verifica se a localização foi obtida corretamente
        if ("coords" in locResult && locResult.coords) {
          const coords = locResult.coords;
          setLocation(coords);
          setDetalhe("Localização obtida, buscando endereço...");

          const [reverse] = await Location.reverseGeocodeAsync({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });

          if (reverse) {
            setEndereco(reverse);
            navigation.navigate("Main", {
              screen: "Pedido",
              params: {
                pedidos: pedidosAtuais,
                localizacao: coords,
                endereco: reverse,
              },
            });
          } else {
            setDetalhe("Não conseguimos identificar o local.");
          }
        } else {
          throw new Error("Localização inválida");
        }
      } catch (err) {
        console.log("Erro ao obter localização:", err);
        setDetalhe("Erro ao detectar localização.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Renderização condicional com base no estado de carregamento
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#008b8b" />
        <Text style={{ marginTop: 15 }}>{detalhe}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Exibe o endereço ou uma mensagem de erro */}

      <Text style={styles.textLocal}>Você está em:</Text>

      {/* Se o endereço foi obtido, exibe os detalhes */}
      {endereco ? (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textRua}>
            {endereco.street
              ? `${endereco.street}${
                  endereco.name && isNaN(Number(endereco.name))
                    ? `, ${endereco.name}`
                    : ""
                }`
              : endereco.name}
          </Text>

          <Text style={styles.textBairro}>
            {endereco.district ? `${endereco.district}, ` : ""}
            {endereco.city} - {endereco.region}
          </Text>
        </View>
      ) : (
        <Text>Não conseguimos determinar o local.</Text>
      )}
    </View>
  );
}
