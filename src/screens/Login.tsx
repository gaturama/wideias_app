import { useCallback, useState } from "react";
import { styles } from "../styles/stylesLogin";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

{/* Mockup de usuários para teste */}
const users = [
  { id: 1, email: "teste@email.com", password: 1234 },
  { id: 2, email: "teste2@email.com", password: 456 },
];

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Login({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  {/* Função para esconder a senha do usuário */}
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  {/* Função que apaga a login do usuário ao retornar a tela de login */}
  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  {/* Função para acessar tela de home caso o login for concluído com sucesso */}
  const handleHome = () => {
    const user = users.find(
      (u) => u.email === email && u.password.toString() === password
    );
    if (user) {
      navigation.navigate("Home");
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  {/* Função para acessar a tela de cadastro */}
  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/marca_android.png")}
        />

        {/* Input's de login */}
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            placeholder="Senha"
            value={password}
            style={styles.inputPassword}
            onChangeText={setPassword}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <Image
              source={
                showPassword
                  ? require("../assets/ic_eye_closed.png")
                  : require("../assets/ic_eye.png")
              }
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleHome}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.textCadastro} onPress={handleCadastro}>
          Realizar Cadastro
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
