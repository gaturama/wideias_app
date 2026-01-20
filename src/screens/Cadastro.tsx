import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesCadastro";
import { RootStackParamList } from "../navigation/types";
import { supabase } from "../../utils/supabase";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

type PerfilUpdate = {
  id?: string | null;
  nome?: string | null;
  cpf?: string | null;
  telefone?: string | null;
  data_nascimento?: string | null;
  credit?: number | null;
};

export default function Cadastro({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!name || !email || !password || !phoneNumber || !cpf || !date) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      Alert.alert("Erro", "CPF inválido! Digite apenas números (11 dígitos)");
      return;
    }

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(date)) {
      Alert.alert("Erro", "Data inválida! Use o formato AAAA-MM-DD (ex: 2001-12-31)");
      return;
    }

    setLoading(true);

    try {
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            nome: name,
            cpf: cpfNumeros,
          },
        },
      });

      if (authError) {
        setLoading(false);
        Alert.alert("Erro no cadastro", authError.message);
        return;
      }

      if (!authData.user) {
        setLoading(false);
        Alert.alert("Erro", "Erro ao criar usuário");
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update<PerfilUpdate>({
          nome: name.trim(),
          cpf: cpfNumeros,
          telefone: phoneNumber.trim(),
          data_nascimento: date,
          credit: 0,
        })
        .eq("id", authData.user.id);

      if (profileError) {
        setLoading(false);
        console.error("Erro ao criar perfil:", profileError);
        Alert.alert(
          "Erro no perfil",
          "Não foi possível criar o perfil. Por favor, tente novamente."
        );
        return;
      }

      setLoading(false);
      
      Alert.alert(
        "Cadastro realizado",
        `Usuário ${name} cadastrado com sucesso!\n\nVerifique seu email para confirmar o cadastro.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );

      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setDate("");
      setCpf("");

    } catch (err: any) {
      setLoading(false);
      console.error("Erro no cadastro:", err);
      Alert.alert("Erro", err?.message || "Ocorreu um erro inesperado");
    }
  };

  const formatCPF = (text: string) => {
    const numeros = text.replace(/\D/g, "");
    if (numeros.length <= 11) {
      setCpf(numeros);
    }
  };

  const formatPhone = (text: string) => {
    const numeros = text.replace(/\D/g, "");
    if (numeros.length <= 11) {
      setPhoneNumber(numeros);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f2ebe0" }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Criar conta" color="white" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.inputText}>Nome Completo</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="words"
          placeholder="Seu nome completo"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={!loading}
        />

        <Text style={styles.inputText}>CPF</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="12345678900"
          style={styles.input}
          value={cpf}
          onChangeText={formatCPF}
          keyboardType="numeric"
          maxLength={11}
          editable={!loading}
        />

        <Text style={styles.inputText}>E-mail</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="seu@email.com"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
        />

        <Text style={styles.inputText}>Senha</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Mínimo 6 caracteres"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.inputText}>Telefone</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="47999999999"
          style={styles.input}
          value={phoneNumber}
          onChangeText={formatPhone}
          keyboardType="phone-pad"
          maxLength={11}
          editable={!loading}
        />

        <Text style={styles.inputText}>Data de Nascimento</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="2001-12-31"
          style={styles.input}
          value={date}
          onChangeText={setDate}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {"Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}