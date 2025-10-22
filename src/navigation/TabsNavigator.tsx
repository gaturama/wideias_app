import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "./typeTabs";
import { Ionicons } from "@expo/vector-icons";
import Produto from "../screens/Produto";
import Pedido from "../screens/Pedido";
import Credito from "../screens/Credito";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F6EA8",
          borderTopWidth: 0,
          elevation: 10,
          height: 70,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Produto") iconName = "fast-food";
          else if (route.name === "Credito") iconName = "wallet";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#fff",
      })}
    >
      <Tab.Screen name="Home" component={Pedido} />
      <Tab.Screen name="Produto" component={Produto} />
      <Tab.Screen name="Credito" component={Credito} />
    </Tab.Navigator>
  );
  4;
}