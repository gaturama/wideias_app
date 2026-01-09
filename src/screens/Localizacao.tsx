import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import { styles } from "../styles/stylesLocalizacao";
import CustomAlert from "../components/CustomAlert";
import { supabase } from "../../utils/supabase";

// Tipos
interface Localizacao {
  id: string;
  name: string;
  address: string;
  description?: string;
  status?: string;
  created_at?: string;
}

interface ModalData {
  title: string;
  message: string;
  id: string;
}

export default function EventsScreen({ navigation }) {
  const [locationAddress, setLocationAddress] = useState<string>(
    "Buscando localização..."
  );
  const [locations, setLocations] = useState<Localizacao[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocationData, setCurrentLocationData] = useState<ModalData | null>(
    null
  );

  // Função para buscar locations do banco
  const buscarLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;

      setLocations(data || []);
      setErrorMsg(null);
    } catch (error: any) {
      console.error("Erro ao buscar localizações:", error);
      setErrorMsg("Não foi possível carregar as localizações.");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Função para buscar localização do usuário
  const buscarLocalizacaoUsuario = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permissão para acessar a localização foi negada.");
      setLocationAddress("Localização não disponível");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

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
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
      setLocationAddress("Erro ao buscar localização");
    }
  };

  useEffect(() => {
    (async () => {
      await buscarLocalizacaoUsuario();
      await buscarLocations();
    })();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    buscarLocations();
  };

  const handleAttendPress = (item: Localizacao) => {
    setCurrentLocationData({
      title: "Confirme sua Presença",
      message: `Você selecionou: ${item.name}.\nConfirme para continuar`,
      id: item.id,
    });
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (currentLocationData) {
      console.log(`Presença confirmada na localização ID: ${currentLocationData.id}`);

      // Buscar a localização completa para passar os dados
      const localizacaoSelecionada = locations.find(l => l.id === currentLocationData.id);

      navigation.navigate("Main", {
        screen: "Pedido",
        params: {
          locationId: currentLocationData.id,
          locationName: localizacaoSelecionada?.name,
        },
      });
    }
    setIsModalVisible(false);
    setCurrentLocationData(null);
  };

  const handleCancel = () => {
    console.log("Usuário cancelou a confirmação");
    setIsModalVisible(false);
    setCurrentLocationData(null);
  };

  const renderLocationItem = ({ item }: { item: Localizacao }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventLocation}>{item.address}</Text>
        {item.description && (
          <Text >{item.description}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.attendButton}
        onPress={() => handleAttendPress(item)}
      >
        <Text style={styles.attendButtonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Locais Disponíveis</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.currentLocationText}>Localização Atual</Text>
        <Text style={styles.locationAddress}>{locationAddress}</Text>
      </View>

      <Text style={styles.sectionTitle}>Locais próximos</Text>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 50 }}
        />
      ) : errorMsg ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <TouchableOpacity
            onPress={onRefresh}
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#007AFF",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : locations.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={styles.errorText}>Nenhum local disponível no momento</Text>
        </View>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={renderLocationItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {currentLocationData && (
        <CustomAlert
          isVisible={isModalVisible}
          title={currentLocationData.title}
          message={currentLocationData.message}
          onClose={handleConfirm}
          onCancel={handleCancel}
          confirmText="Confirmar"
          cancelText="Voltar"
        />
      )}
    </View>
  );
}