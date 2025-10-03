import { useState } from "react";
import { styles } from "../styles/stylesLogin";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Login({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleHome = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/marca_android.png")}
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => {}}
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            placeholder="Password"
            style={styles.inputPassword}
            onChangeText={(text) => {}}
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
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText} onPress={handleHome}>Entrar</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
