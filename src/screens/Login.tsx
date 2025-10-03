import { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../styles/stylesLogin";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require("../assets/marca_android.png")}
            />
            <Text style={styles.title}>Login</Text>
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
                        source={showPassword ? require("../assets/ic_eye_closed.png") : require("../assets/ic_eye.png")}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}