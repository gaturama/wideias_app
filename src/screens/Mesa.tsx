import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Appbar } from "react-native-paper";
import { useMesa } from "../context/MesaContext";
import { supabase } from "../../utils/supabase";
import { styles } from "../styles/stylesMesa";

export default function Mesa({ navigation, route }) {
  const { setMesa } = useMesa();
  const [mesaLocal, setMesaLocal] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Receber parâmetros do carrinho
  const cart = route.params?.cart || [];
  const tipoLocal = route.params?.tipoLocal;
  const locationId = route.params?.locationId;
  const observacoes = route.params?.observacoes || "";
  const total = route.params?.total || 0;

  // Buscar dados do usuário ao montar o componente
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Buscar usuário autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      setUserId(user.id);

     
    
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  // Função para confirmar mesa e ir para pagamento
  const handleConfirm = () => {
    if (!mesaLocal.trim()) {
      Alert.alert("Atenção", "Por favor, informe o número da mesa!");
      return;
    }

    if (!userId) {
      Alert.alert("Erro", "Dados do usuário não encontrados. Tente novamente.");
      return;
    }

    // Salvar mesa no contexto
    setMesa(mesaLocal);

    // Navegar para Pagamento com TODOS os dados necessários
    navigation.navigate("Pagamento", {
      cart: cart,
      userId: userId,
      locationId: locationId,
      mesa: mesaLocal,
      tipoLocal: tipoLocal,
      observacoes: observacoes,
      total: total,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header >
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Escolher Mesa" color="white" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.title}>Informe o número da sua mesa</Text>
        
        {/* Input da mesa */}
        <TextInput
          style={styles.input}
          placeholder="Mesa"
          keyboardType="numeric"
          value={mesaLocal}
          onChangeText={setMesaLocal}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button]}
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirmar e Pagar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}