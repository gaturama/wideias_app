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
      // 1. Busca todos os pedidos com status "completed"
      const { data: ordersCompleted, error: ordersError } = await supabase
        .from("orders")
        .select("id")
        .eq("status", "completed");

      if (ordersError) {
        console.error("Erro ao buscar pedidos:", ordersError);
        setLoading(false);
        return;
      }

      if (!ordersCompleted || ordersCompleted.length === 0) {
        console.log("Nenhum pedido completo encontrado");
        setItens([]);
        setLoading(false);
        return;
      }

      // 2. Pega os IDs dos pedidos completos
      const orderIds = ordersCompleted.map(order => order.id);
      console.log("IDs dos pedidos completos:", orderIds);

      // 3. Busca os itens desses pedidos
      const { data: orderItemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds);

      if (itemsError) {
        console.error("Erro ao buscar itens:", itemsError);
        setLoading(false);
        return;
      }

      console.log("Itens encontrados:", orderItemsData);

      // 4. Busca as informações dos produtos (incluindo imagem)
      const itensComProdutos = await Promise.all(
        orderItemsData.map(async (item) => {
          if (!item.product_id) {
            return {
              ...item,
              product_image: null,
              product_name: null,
            };
          }

          const { data: productData, error: productError } = await supabase
            .from("products")
            .select("image_url, name")
            .eq("id", item.product_id)
            .maybeSingle();

          if (productError) {
            console.warn(`Erro ao buscar produto ${item.product_id}:`, productError);
          }

          if (!productData) {
            console.warn(`Produto ${item.product_id} não encontrado`);
          }

          return {
            ...item,
            product_image: productData?.image_url || null,
            product_name: productData?.name || null,
          };
        })
      );

      console.log("Itens com produtos:", itensComProdutos);
      setItens(itensComProdutos);
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

              <View>
                <Text style={styles.title}>
                  {item.product_name || item.name || 'Produto'}
                </Text>

                <Text style={styles.subtitle}>
                  Quantidade: {item.quantity || item.quantidade || 0}
                </Text>

                <Text style={styles.subtitle}>
                  Valor: R$ {((item.price || item.total || 0) * (item.quantity || item.quantidade || 1)).toFixed(2)}
                </Text>

                <Text style={styles.subtitle}>
                  Data: {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : '-'}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}