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
import { authCadastro } from "../services/AuthServiceCadastro";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

// type PerfilUpdate = {
//   id?: string | null;
//   nome?: string | null;
//   cpf?: string | null;
//   telefone?: string | null;
//   data_nascimento?: string | null;
//   credit?: number | null;
// };

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

    if (password.length < 3) {
      Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres!");
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      Alert.alert("Erro", "CPF inválido! Digite apenas números (11 dígitos)");
      return;
    }

    const telefoneNumeros = phoneNumber.replace(/\D/g, "");
    if (telefoneNumeros.length < 10) {
      Alert.alert("Erro", "Telefone inválido!");
      return;
    }

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(date)) {
      Alert.alert("Erro", "Data inválida! Use o formato AAAA-MM-DD (ex: 2001-12-31)");
      return;
    }

    setLoading(true);

    try {
      const resultado = await authCadastro.cadastrarUsuario({
        nome: name.trim(),
        cpf: cpfNumeros,
        email: email.trim().toLowerCase(),
        senha: password,
        telefone: telefoneNumeros,
        nascimento: date,
      }); 

      setLoading(false);

      if (resultado.sucesso) {
        Alert.alert(
          "Cadastro realizado com sucesso!",
          `Bem vindo, ${name}!`,
          [
            {
              text: "OK", 
              onPress: () => {
                setName("");
                setEmail("");
                setPassword("");
                setPhoneNumber("");
                setDate("");
                setCpf("");

                navigation.navigate("Login");
              },
            },
          ]
        );
      } else {
        Alert.alert("Erro no cadastro", resultado.erro)
      }
    } catch (err: any) {
      setLoading(false);
      console.error("Erro inesperado", err);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente");
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
          placeholder="Mínimo 3 caracteres"
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