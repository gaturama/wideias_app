import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesCadastro";
import { RootStackParamList } from "../navigation/types";
import { supabase } from "../../utils/supabase";



type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

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

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      Alert.alert("Erro", error.message);
      return;
    }

    if (!data.user) {
      setLoading(false);
      Alert.alert("Erro", "Erro ao criar usuário");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        nome: name,
        cpf: cpf,
        telefone: phoneNumber,
        data_nascimento: date,
      });

    if (profileError) {
      setLoading(false);
      Alert.alert("Erro no perfil", profileError.message);
      console.error("Erro ao inserir perfil:", profileError);
      return;
    }

    setLoading(false);
    Alert.alert("Sucesso", `Usuário ${name} cadastrado com sucesso!`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login")
      }
    ]);

  } catch (err: any) {
    setLoading(false);
    Alert.alert("Erro", err?.message || "Ocorreu um erro inesperado");
    console.error("Erro no cadastro:", err);
  }
};


  return (
    <View style={{ flex: 1, backgroundColor: "#f2ebe0" }}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Criar conta" color="white" />
      </Appbar.Header>

      <View style={styles.container}>
        {/* <Ionicons name="person-add" size={80} color="#000" style={styles.icon} /> */}

        {/* Input's de cadastro*/}
        <Text style={styles.inputText}>Nome Completo</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Seu nome"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputText}>CPF</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="123.456.789-00"
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
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
        />

        <Text style={styles.inputText}>Senha</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="******"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.inputText}>Telefone</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="(47) 99999-9999"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.inputText}>Data Nascimento</Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="2001-12-31"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}