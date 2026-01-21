import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesCadastro";
import { RootStackParamList } from "../navigation/types";
import { authCadastro } from "../services/AuthServiceCadastro";
import CustomAlert from "../components/CustomAlert";

type Props = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function Cadastro({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleCadastro = async () => {
    if (!name || !email || !password || !phoneNumber || !cpf || !date) {
      showAlert("Erro", "Preencha todos os campos!");
      return;
    }

    if (password.length < 3) {
      showAlert("Erro", "A senha deve ter pelo menos 4 caracteres!");
      return;
    }

    const cpfNumeros = cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      showAlert("Erro", "CPF inválido! Digite apenas números (11 dígitos)");
      return;
    }

    const telefoneNumeros = phoneNumber.replace(/\D/g, "");
    if (telefoneNumeros.length < 10) {
      showAlert("Erro", "Telefone inválido!");
      return;
    }

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(date)) {
      showAlert(
        "Erro",
        "Data inválida! Use o formato AAAA-MM-DD (ex: 2001-12-31)",
      );
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
        showAlert(
          "Cadastro realizado com sucesso!",
          `Bem vindo, ${name}!`,
          () => {
            setName("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            setDate("");
            setCpf("");

            navigation.navigate("Login");
          },
        );
      } else {
        showAlert("Erro no cadastro", resultado.erro);
      }
    } catch (err: any) {
      setLoading(false);
      console.error("Erro inesperado", err);
      showAlert("Erro", "Ocorreu um erro inesperado. Tente novamente");
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
          <Text style={styles.buttonText}>{"Cadastrar"}</Text>
        </TouchableOpacity>
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
