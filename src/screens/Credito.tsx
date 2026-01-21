import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesCredito";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import CustomAlert from "../components/CustomAlert";

export default function Credito({ navigation }) {
  const [valor, setValor] = useState<string>("");
  const [credito, setCredito] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOnConfirmm, setAlertOnConfirm] = useState<(() => void) | null>(
    null,
  );

  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void,
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOnConfirm(() => onConfirm || (() => setAlertVisible(false)));
    setAlertVisible(true);
  };

  useEffect(() => {
    carregarCredito();
  }, []);

  const carregarCredito = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        showAlert("Erro", "Usuário não autenticado");
        return;
      }

      setUserId(user.id);

      await supabase.from("profiles").upsert(
        {
          id: user.id,
          credit: 0,
        },
        { onConflict: "id", ignoreDuplicates: true },
      );

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("credit")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao carregar crédito:", error);
        showAlert("Erro", "Não foi possível carregar o crédito");
        setCredito(0);
        return;
      }

      setCredito(profile?.credit || 0);
    } catch (error: any) {
      console.error("Erro ao carregar crédito:", error);
      showAlert("Erro", "Não foi possível carregar o crédito");
      setCredito(0);
    }
  };

  const adicionarCredito = async (
    valorAdicionar: number,
    metodoPagamento: string,
  ) => {
    if (!userId) {
      showAlert("Erro", "Usuário não autenticado");
      return;
    }

    setLoading(true);

    try {
      const novoCredito = credito + valorAdicionar;

      const { error } = await supabase
        .from("profiles")
        .update({ credit: novoCredito })
        .eq("id", userId);

      if (error) throw error;

      setCredito(novoCredito);
      showAlert(
        "Sucesso",
        `R$ ${valorAdicionar.toFixed(2)} adicionados ao seu saldo via ${metodoPagamento}!\n\nNovo saldo: R$ ${novoCredito.toFixed(2)}`,
      );
      setValor("");
    } catch (error: any) {
      console.error("Erro ao adicionar crédito:", error);
      showAlert("Erro", "Não foi possível adicionar crédito");
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarCreditoCustom = (metodoPagamento: string) => {
    const valorNum = parseFloat(valor);
    if (!valorNum || valorNum <= 0) {
      showAlert("Erro", "Digite um valor válido para adicionar crédito.");
      return;
    }
    adicionarCredito(valorNum, metodoPagamento);
  };

  const handleValorPredefinido = (
    valorPredefinido: number,
    metodoPagamento: string,
  ) => {
    adicionarCredito(valorPredefinido, metodoPagamento);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Adicionar Crédito" color="white" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.container}>
          <Ionicons
            name="wallet-outline"
            size={100}
            color="#000"
            style={styles.iconPay}
          />

          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#666", marginBottom: 8 }}>
              Saldo atual
            </Text>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: "#000" }}>
              R$ {credito.toFixed(2)}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
            {[20, 50, 100].map((valorPredefinido) => (
              <TouchableOpacity
                key={valorPredefinido}
                style={[styles.buttonCredito, { paddingHorizontal: 15 }]}
                onPress={() => {
                  Alert.alert(
                    "Selecione o método de pagamento",
                    `Adicionar R$ ${valorPredefinido.toFixed(2)}`,
                    [
                      {
                        text: "PIX",
                        onPress: () =>
                          handleValorPredefinido(valorPredefinido, "PIX"),
                      },
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                    ],
                  );
                }}
                disabled={loading}
              >
                <Text style={styles.textSaldo}>R$ {valorPredefinido}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Digite o valor"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
            style={styles.textValue}
            editable={!loading}
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => handleAdicionarCreditoCustom("PIX")}
              >
                <Image
                  source={require("../assets/ic_pix.png")}
                  style={styles.iconContent}
                />
                <Text style={styles.textContent}>PIX</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => handleAdicionarCreditoCustom("Samsung Pay")}
              >
                <Image
                  source={require("../assets/ic_samsung.png")}
                  style={[styles.iconContent, { backgroundColor: "#F5F5F5" }]}
                />
                <Text style={styles.textContent}>Samsung Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => handleAdicionarCreditoCustom("Google Pay")}
              >
                <Image
                  source={require("../assets/ic_google.png")}
                  style={styles.iconContent}
                />
                <Text style={styles.textContent}>Google Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => handleAdicionarCreditoCustom("Apple Pay")}
              >
                <Image
                  source={require("../assets/ic_apple.png")}
                  style={styles.iconContent}
                />
                <Text style={styles.textContent}>Apple Pay</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <CustomAlert 
        isVisible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          if (alertOnConfirmm) {
            alertOnConfirmm();
          } else {
            setAlertVisible(false);
          }
        }}      
        confirmText="OK"
      />
    </View>
  );
}
