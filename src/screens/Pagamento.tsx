import React from "react";
import { styles } from "../styles/stylesPagamento";
import { RootStackParamList } from "../navigation/types";
import { View, Text, TouchableOpacity} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Pagamento({navigation}: Props) {
    const pedidoTeste = {
        id: "WID-20251006-001",
        usuario: 'gabriel',
        produtos: [
            {nome: "Suco de Laranja", quantidade: 2},
            {nome: "Energético Red Bull", quantidade: 1},
        ],
        valorTotal: 78.5,
    };

    const handleQrCode = () => {
        navigation.navigate("QrCode", {pedido: pedidoTeste});
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pagamentoText}>Confirmar Pagamento</Text>
            <TouchableOpacity onPress={handleQrCode}>
                <Text>Pagar e Gerar QR code</Text>
            </TouchableOpacity>
        </View>
    )
}