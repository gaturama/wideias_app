import { useState, useEffect } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";

type Props = NativeStackScreenProps<RootStackParamList, "Produto">;

type PerfilUpdate = {
  nome: string;
  cpf: string | null;
  telefone: string;
  data_nascimento: string | null;
};


export default function Perfil({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
  carregarPerfil().catch(console.error);
}, []);

  const carregarPerfil = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        navigation.navigate("Login");
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao carregar perfil:", error);
        return;
      }

      if (profile) {
        setName(profile.nome || "");
        setCpf(profile.cpf || "");
        setPhoneNumber(profile.telefone || "");
        setDate(profile.data_nascimento || "");
        setImage(profile.avatar_url || "");
      }

    } catch (error: any) {
      console.error("Erro ao carregar perfil:", error);
      Alert.alert("Erro", "Não foi possível carregar o perfil");
    }
  };

  const handleEdit = async () => {
    if (!name || !phoneNumber) {
      Alert.alert("Erro", "Preencha pelo menos nome e telefone!");
      return;
    }

    if (!userId) {
      Alert.alert("Erro", "Usuário não identificado");
      return;
    }

    setSaving(true);

    try {
      // Atualiza o perfil
      const { error: profileError } = await supabase
        .from("profiles")
        .update<PerfilUpdate>({
            nome: name,
            cpf: cpf || null,
            telefone: phoneNumber,
            data_nascimento: date || null,
          }) 
        .eq("id", userId);

      if (profileError) throw profileError;

      // Se a senha foi alterada, atualiza também
      if (password && password.length >= 6) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password,
        });

        if (passwordError) throw passwordError;
      }

      setSaving(false);
      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
      setPassword(""); // Limpa o campo de senha
    } catch (error: any) {
      setSaving(false);
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", error.message || "Não foi possível atualizar o perfil");
    }
  };

  const handleLogin = async () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await supabase.auth.signOut();
            navigation.navigate("Login");
          },
        },
      ]
    );
  };

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de permissão para acessar a galeria!");
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
    { key: "email", placeholder: "Email", value: email, onChange: setEmail, disabled: true },
    {
      key: "password",
      placeholder: "Nova Senha (deixe em branco para não alterar)",
      value: "",
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
      placeholder: "Data de Aniversário (AAAA-MM-DD)",
      value: date,
      onChange: setDate,
    },
  ];


  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
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
            style={[styles.input, item.disabled && { backgroundColor: "#f0f0f0" }]}
            value={item.value}
            onChangeText={item.onChange}
            secureTextEntry={item.secure || false}
            editable={!item.disabled}
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
            <TouchableOpacity 
              style={[styles.editButton, saving && { opacity: 0.5 }]} 
              onPress={handleEdit}
              disabled={saving}
            >
              <Text style={styles.editButtonText}>
                {"Salvar Alterações"}
              </Text>
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