import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { styles } from "../styles/stylesDescProduto";
import { supabase } from "../../utils/supabase";

interface Ingrediente {
  id: string;
  nome: string;
  incluso: boolean;
  removable: boolean;
}

interface Adicional {
  id: string;
  nome: string;
  preco: number;
  selecionado: boolean;
}

export default function DescricaoProduto({ route, navigation }: any) {
  const produto = route.params?.produto;
  const produtoEditado = route.params?.produtoEditado;
  const tipoLocal = route.params?.tipoLocal;
  const cart = route.params?.cart || [];
  const editar = route.params?.editar || false;
  const editIndex = route.params?.editIndex;
  const eventId = route.params?.eventId;
  const locationId = route.params?.locationId;

  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [adicionais, setAdicionais] = useState<Adicional[]>([]);
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!produto?.id) return;
    carregarCustomizacoes();
  }, []);

  async function carregarCustomizacoes() {
    try {
      // @ts-ignore
      const { data: ingredientesDB, error: ingError } = await supabase
        .from("product_ingredients")
        .select("id, name, default_included, removable")
        .eq("product_id", produto.id);

      if (ingError) throw ingError;

      // @ts-ignore
      const { data: adicionaisDB, error: addError } = await supabase
        .from("product_additionals")
        .select("id, name, price")
        .eq("product_id", produto.id);

      if (addError) throw addError;

      // Carregar ingredientes
      const ingredientesCarregados = (ingredientesDB || []).map((i) => ({
        id: i.id,
        nome: i.name,
        incluso: i.default_included,
        removable: i.removable,
      }));

      // Carregar adicionais
      const adicionaisCarregados = (adicionaisDB || []).map((a) => ({
        id: a.id,
        nome: a.name,
        preco: a.price,
        selecionado: false,
      }));

      // Se estiver editando, aplicar as seleções anteriores
      if (editar && produtoEditado) {
        // Restaurar ingredientes removidos
        if (produtoEditado.ingredientes_removidos) {
          const idsRemovidos = produtoEditado.ingredientes_removidos.map(
            (i: any) => i.id
          );
          ingredientesCarregados.forEach((ing) => {
            if (idsRemovidos.includes(ing.id)) {
              ing.incluso = false;
            }
          });
        }

        // Restaurar adicionais selecionados
        if (produtoEditado.adicionais) {
          const idsAdicionais = produtoEditado.adicionais.map(
            (a: any) => a.id
          );
          adicionaisCarregados.forEach((add) => {
            if (idsAdicionais.includes(add.id)) {
              add.selecionado = true;
            }
          });
        }

        // Restaurar observação
        if (produtoEditado.observacao) {
          setObservacao(produtoEditado.observacao);
        }
      }

      setIngredientes(ingredientesCarregados);
      setAdicionais(adicionaisCarregados);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Erro ao carregar ingredientes e adicionais");
    } finally {
      setLoading(false);
    }
  }

  const toggleIngrediente = (id: string) => {
    setIngredientes((prev) =>
      prev.map((i) => (i.id === id ? { ...i, incluso: !i.incluso } : i))
    );
  };

  const toggleAdicional = (id: string) => {
    setAdicionais((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, selecionado: !a.selecionado } : a
      )
    );
  };

  const precoAdicionais = adicionais
    .filter((a) => a.selecionado)
    .reduce((sum, a) => sum + a.preco, 0);

  const precoTotal = produto.price + precoAdicionais;

  const handleAddToCart = () => {
    const itemCarrinho = {
      cartEntryId:
        editar && cart[editIndex]?.cartEntryId
          ? cart[editIndex].cartEntryId
          : `${produto.id}-${Date.now()}`,
      id: produto.id,
      name: produto.name,
      image_url: produto.image_url,
      price: precoTotal,
      qty: editar && cart[editIndex]?.qty ? cart[editIndex].qty : 1,
      ingredientes_removidos: ingredientes.filter(
        (i) => i.removable && !i.incluso
      ),
      adicionais: adicionais.filter((a) => a.selecionado),
      observacao,
    };

    const novoCarrinho = [...cart];

    if (editar && typeof editIndex === "number") {
      novoCarrinho[editIndex] = itemCarrinho;
    } else {
      novoCarrinho.push(itemCarrinho);
    }

    navigation.navigate("Carrinho", {
      cart: novoCarrinho,
      tipoLocal,
      eventId,
      locationId,
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content
          title={editar ? "Editar Produto" : produto.name}
          color="white"
        />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Image
          source={
            produto.image_url
              ? { uri: produto.image_url }
              : require("../assets/ic_product.png")
          }
          style={styles.productImage}
        />

        <Text style={styles.productName}>{produto.name}</Text>
        <Text style={styles.productDesc}>
          {produto.description || "Produto delicioso"}
        </Text>
        <Text style={styles.productPrice}>
          Preço base: R$ {produto.price.toFixed(2)}
        </Text>

        {/* INGREDIENTES */}
        {ingredientes.some((i) => i.removable) && (
          <>
            <Text style={styles.titleSection}>Ingredientes</Text>
            {ingredientes
              .filter((i) => i.removable)
              .map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.option,
                    !item.incluso && styles.removedOption,
                  ]}
                  onPress={() => toggleIngrediente(item.id)}
                >
                  <Text style={styles.optionText}>{item.nome}</Text>
                  <Text style={styles.toggleText}>
                    {item.incluso ? "✓ Incluso" : "❌ Remover"}
                  </Text>
                </TouchableOpacity>
              ))}
          </>
        )}

        {/* ADICIONAIS */}
        {adicionais.length > 0 && (
          <>
            <Text style={styles.titleSection}>Adicionais</Text>
            {adicionais.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.option,
                  item.selecionado && styles.selectedOption,
                ]}
                onPress={() => toggleAdicional(item.id)}
              >
                <Text style={styles.optionText}>
                  {item.nome} (+ R$ {item.preco.toFixed(2)})
                </Text>
                {item.selecionado && (
                  <Text style={styles.toggleText}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* OBSERVAÇÃO */}
        <Text style={styles.titleSection}>Observações</Text>
        <TextInput
          mode="outlined"
          placeholder="Ex: sem cebola, pouco molho..."
          value={observacao}
          onChangeText={setObservacao}
          multiline
          style={{ marginBottom: 20 }}
        />

        {/* FOOTER */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.totalLabel}>Total com adicionais:</Text>
            <Text style={styles.totalText}>R$ {precoTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.textButton}>
              {editar ? "Salvar Alterações" : "Adicionar ao Carrinho"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}