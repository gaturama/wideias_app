import { useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesPerfil";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Perfil({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  {/* Função para que seja possível a edição do perfil do usuário */}
  const handleEdit = () => {
    if (!name || !email || !password || !phoneNumber) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }

    alert("Informações atualizadas com sucesso!");
  };

  {/* Função para selecionar uma foto da galeria do celular do usuário */}
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

  return (
    <View style={{ flex: 1 }}>
      {/* Header customizável */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../assets/ic_user.png")}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>Editar Perfil</Text>

        {/* Input's da tela de perfil */}
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

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <View style={styles.buttonContent}>
            <Image
              source={require("../assets/ic_loggout.png")}
              style={styles.exit}
            />
            <Text style={styles.buttonText}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
