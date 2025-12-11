import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { styles } from "../styles/stylesLocalizacao";
import CustomAlert from "../components/CustomAlert";

// Tipos
interface Evento {
  id: string;
  nome: string;
  data: string;
  hora: string;
  local: string;
}

interface ModalData {
  title: string;
  message: string;
  id: string;
}

// Dados mockados de eventos
const EVENTOS_MOCK: Evento[] = [
  {
    id: "1",
    nome: "Show Cover M. Jackson",
    data: "4 de Junho",
    hora: "20:00 PM",
    local: "Praia Central",
  },
  {
    id: "2",
    nome: "Festa do Divino",
    data: "7 de Junho",
    hora: "19:00 PM",
    local: "Igreja Matriz Divino Espirito Santo",
  },
  {
    id: "3",
    nome: "Beiro Open Bar",
    data: "10 de Junho",
    hora: "22:00 PM",
    local: "Beiro Bebidas e Tabacaria",
  },
  {
    id: "4",
    nome: "Passeio Ciclistico",
    data: "12 de Junho",
    hora: "10:00 AM",
    local: "Prefeitura Municipal de Barra Velha",
  },
];

export default function EventsScreen({ navigation }) {
  const [locationAddress, setLocationAddress] = useState<string>(
    "Buscando localização..."
  );
  const [events, setEvents] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pedidosAtuais, setPedidosAtuais] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEventData, setCurrentEventData] = useState<ModalData | null>(
    null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada.");
        setIsLoading(false);
        return;
      }

      try {
        // Obter a localização atual
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Reverter geocoding para obter o endereço
        let geocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geocode && geocode.length > 0) {
          const { city, region } = geocode[0];
          const fullAddress = `${city}, ${region}`;
          setLocationAddress(fullAddress);
        } else {
          setLocationAddress("Localização desconhecida");
        }

        // Simular o carregamento de eventos com base na localização
        setEvents(EVENTOS_MOCK);
      } catch (error) {
        console.error("Erro ao buscar localização ou eventos:", error);
        setErrorMsg("Não foi possível obter a localização ou eventos.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleAttendPress = (item: Evento) => {
    setCurrentEventData({
      title: "Confirme sua Presença",
      message: `Você selecionou o evento: ${item.nome}.\nConfirme para continuar`,
      id: item.id,
    });
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (currentEventData) {
      console.log(`Presença confirmada no evento ID: ${currentEventData.id}`);

      navigation.navigate("Main", {
        screen: "Pedido",
        params: {
          pedidos: pedidosAtuais,
        },
      });
    }
    setIsModalVisible(false);
    setCurrentEventData(null);
  };

  const handleCancel = () => {
    console.log("Usuário cancelou a confirmação");
    setIsModalVisible(false);
    setCurrentEventData(null);
  };

  const renderEventItem = ({ item }: { item: Evento }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.nome}</Text>
        <Text style={styles.eventTime}>
          {item.data}, {item.hora}
        </Text>
        <Text style={styles.eventLocation}>{item.local}</Text>
      </View>
      <TouchableOpacity style={styles.attendButton}>
        <Text
          style={styles.attendButtonText}
          onPress={() => handleAttendPress(item)}
        >
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventos</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.currentLocationText}>Localização Atual</Text>
        <Text style={styles.locationAddress}>{locationAddress}</Text>
      </View>

      <Text style={styles.sectionTitle}>Eventos próximos</Text>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 50 }}
        />
      ) : errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEventItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      {currentEventData && (
        <CustomAlert
          isVisible={isModalVisible}
          title={currentEventData.title}
          message={currentEventData.message}
          onClose={handleConfirm}
          onCancel={handleCancel}
          confirmText="Confirmar"
          cancelText="Voltar"
        />
      )}
    </View>
  );
}