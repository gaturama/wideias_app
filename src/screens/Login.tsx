import { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/stylesLogin";
import CustomAlert from "../components/CustomAlert";
import { authCadastro } from "../services/AuthServiceCadastro";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Localizacao: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }, []),
  );

  const validateForm = (): boolean => {
    if (!email.trim()) {
      showAlert("Erro", "Informe o email");
      return false;
    }
    if (!password.trim()) {
      showAlert("Erro", "Informe a senha");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const resultado = await authCadastro.loginUsuario({
        email: email.trim().toLowerCase(),
        senha: password,
      });

      setIsLoading(false);

      if (resultado.sucesso) {
        console.log("Login realizado: ", resultado.dados);

        showAlert("Bem vindo!", "Login realizado com sucesso", () => {
          setAlertVisible(false);
          navigation.navigate("Localizacao");
        });
      } else {
        showAlert("Erro na autenticação", resultado.erro);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Erro inesperado no login", error);
      showAlert("Erro", "Ocorreu um erro inesperado. Tente novamente.")
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <StatusBar barStyle="dark-content" />

      <Image
        style={styles.image}
        source={require("../assets/ic_logo_wideias.png")}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.icon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{"Entrar"}</Text>
      </TouchableOpacity>

      <Text
        style={styles.textCadastro}
        onPress={() => navigation.navigate("Cadastro")}
      >
        Realizar Cadastro
      </Text>
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
