import React, { useEffect, useRef } from "react";
import { View, Image, Text, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Circle } from "react-native-svg";
import { styles } from "../styles/stylesLoading";

SplashScreen.preventAutoHideAsync();

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function LoadingScreen({ navigation, route }: any) {
  const userData = route?.params?.userData;
  const fillAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: 200,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    // Animação de onda
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();

    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.error("Erro ao carregar recursos:", error);
      } finally {
        await SplashScreen.hideAsync();
        navigation.replace("Localizacao", { userData });
      }
    };

    prepare();
  }, []);

  const translateY = fillAnim.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Logo em escala de cinza */}
        <Image
          source={require("../assets/ic_logo_wideias.png")}
          style={[styles.logo, { tintColor: "#e0e0e0" }]}
          resizeMode="contain"
        />

        {/* Máscara com efeito líquido */}
        <Animated.View
          style={[
            styles.liquidMask,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Image
            source={require("../assets/ic_logo_wideias.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <Text style={styles.title}>Wideias</Text>
      <Text style={styles.subtitle}>Carregando...</Text>
    </View>
  );
}
