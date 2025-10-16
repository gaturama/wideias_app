import { useState } from "react";
import { styles } from "../styles/stylesCadastro";
import { RootStackParamList } from "../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Pedido">;

export default function Cadastro({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCadastro = () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Sucesso", `Usuário ${name} cadastrado!`);

    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f2ebe0"}}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
         <Appbar.BackAction onPress={() => navigation.goBack()} color="white"/>
          <Appbar.Content title="Criar conta" color="white"/>
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/ic_user.png")}
            style={styles.icon}
          />
        </View>

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

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
