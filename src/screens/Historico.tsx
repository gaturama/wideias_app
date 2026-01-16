import { FlatList, Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { styles } from "../styles/stylesHistorico";
import { supabase } from "../../utils/supabase"; 

export default function Historico() {
  const [itens, setItens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItensCompletos() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log("Usuário não autenticado");
        setLoading(false);
        return;
      }

      // Buscar itens com status "completed" diretamente da tabela order_items
      const { data: orderItemsData, error: itemsError } = await supabase
        .from("order_items")
        .select(`
          *,
          products (
            id,
            name,
            image_url
          ),
          orders!inner (
            id,
            user_id,
            payment_method,
            mesa,
            locations (
              id,
              name,
              address
            )
          )
        `)
        .eq("orders.user_id", user.id)
        .eq("status", "completed") // Filtrar por status do item
        .order("created_at", { ascending: false });

      if (itemsError) {
        console.error("Erro ao buscar itens:", itemsError);
        setLoading(false);
        return;
      }

      if (!orderItemsData || orderItemsData.length === 0) {
        console.log("Nenhum item completo encontrado");
        setItens([]);
        setLoading(false);
        return;
      }

      console.log("Itens completos encontrados:", orderItemsData.length);
      
      // Formatar os dados para exibição
      const itensFormatados = orderItemsData.map(item => ({
        id: item.id,
        product_name: item.products?.name || "Produto",
        product_image: item.products?.image_url || null,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        created_at: item.created_at,
        observations: item.observations,
        location_name: item.orders?.locations?.name || "N/A",
        mesa: item.orders?.mesa,
        payment_method: item.orders?.payment_method,
      }));

      setItens(itensFormatados);
      setLoading(false);
    } catch (error) {
      console.error("Erro geral:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItensCompletos();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.head}>
        <Appbar.Content title="Histórico de Pedidos" color="white" />
      </Appbar.Header>

      {loading ? (
        <View style={styles.emptyContainer}>
          <Text>Carregando pedidos...</Text>
        </View>
      ) : itens.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>Nenhum item finalizado ainda</Text>
        </View>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ 
                  uri: item.product_image || 'https://placehold.co/100x100/png?text=Sem+Imagem'
                }}
                style={styles.productImage}
                resizeMode="cover"
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                  {item.product_name}
                </Text>

                <Text style={styles.subtitle}>
                  Local: {item.location_name}
                </Text>

                <Text style={styles.subtitle}>
                  Quantidade: {item.quantity}
                </Text>

                <Text style={styles.subtitle}>
                  Valor: R$ {item.total.toFixed(2)}
                </Text>

                {item.mesa && (
                  <Text style={styles.subtitle}>
                    Mesa: {item.mesa}
                  </Text>
                )}

                {item.observations && (
                  <Text style={[styles.subtitle, { fontStyle: "italic", marginTop: 4 }]}>
                    Obs: {item.observations}
                  </Text>
                )}

                <Text style={styles.subtitle}>
                  Data: {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : '-'}
                </Text>

                <Text style={[styles.subtitle, { color: "#4CAF50", marginTop: 4 }]}>
                  Status: Concluído
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}