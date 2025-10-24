import { useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPerfil";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Produto">;

export default function Perfil({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [image, setImage] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Função para que seja possível a edição do perfil do usuário
  const handleEdit = () => {
    if (!name || !email || !password || !phoneNumber) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    alert("Informações atualizadas com sucesso!");
  };

  // Função para selecionar uma foto da galeria do celular do usuário
  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Precisamos de permisão para acessar a galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const inputs = [
    { key: "name", placeholder: "Nome", value: name, onChange: setName },
    { key: "email", placeholder: "Email", value: email, onChange: setEmail },
    {
      key: "password",
      placeholder: "Senha",
      value: password,
      onChange: setPassword,
      secure: true,
    },
    {
      key: "phone",
      placeholder: "Telefone",
      value: phoneNumber,
      onChange: setPhoneNumber,
    },
    { key: "cpf", placeholder: "CPF", value: cpf, onChange: setCpf },
    {
      key: "date",
      placeholder: "Data de Aniversário",
      value: date,
      onChange: setDate,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Perfil" color="white" />
      </Appbar.Header>

      <FlatList
        data={inputs}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ margin: 15, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TextInput
            placeholder={item.placeholder}
            style={styles.input}
            value={item.value}
            onChangeText={item.onChange}
            secureTextEntry={item.secure || false}
            keyboardType={
              item.key === "email"
                ? "email-address"
                : item.key === "phone"
                ? "phone-pad"
                : "default"
            }
            autoCorrect={false}
            autoCapitalize="none"
          />
        )}
        ListHeaderComponent={
          <>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.avatarContainer}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <Ionicons name="person" size={60} color="#CCC" />
              )}
            </TouchableOpacity>
            <Text style={styles.title}>Editar Perfil</Text>
          </>
        }
        ListFooterComponent={
          <>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <View style={styles.buttonContent}>
                <Ionicons name="exit-outline" size={50} color="black" />
                <Text style={styles.buttonText}>Sair</Text>
              </View>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
}
