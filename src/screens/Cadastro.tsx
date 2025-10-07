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

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Cadastro({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleCadastro = () => {
    if (!name || !email || !password || !phoneNumber) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    Alert.alert("Sucesso", `Usuário ${name} cadastrado!`);

    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <TouchableOpacity onPress={handleLogin}>
          <Image
            source={require("../assets/ic_back.png")}
            style={styles.iconExit}
          />
        </TouchableOpacity>
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.avatarContainer}>
        <Image 
          source={require("../assets/ic_user.png")}
          style={styles.icon}
        />
        </View>

        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Senha"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Telefone"
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
