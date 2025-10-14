import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { styles } from "../styles/stylesDescProduto";

interface Ingrediente {
  id: number;
  nome: string;
  incluso: boolean;
}

interface Adicional {
  id: number;
  nome: string;
  preco: number;
  selecionado: boolean;
}

export default function DescricaoProduto({ route, navigation }) {
  const tipoLocal = route.params?.tipoLocal;
  {
    /* Mockup de produtos para testes */
  }
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { id: 1, nome: "Pão Brioche", incluso: true },
    { id: 2, nome: "Carne 160g", incluso: true },
    { id: 3, nome: "Queijo Cheddar", incluso: true },
    { id: 5, nome: "Alface", incluso: true },
    { id: 6, nome: "Tomate", incluso: true },
    { id: 7, nome: "Cebola Roxa", incluso: true },
    { id: 8, nome: "Molho da Casa", incluso: true },
  ]);

  const [adicionais, setAdicionais] = useState<Adicional[]>([
    { id: 1, nome: "Bacon Crocante", preco: 3.0, selecionado: false },
    { id: 2, nome: "Queijo Extra", preco: 2.5, selecionado: false },
    { id: 3, nome: "Maionese Caseira", preco: 1.5, selecionado: false },
  ]);

  const cartAtual = route.params?.cart || [];
  const [observacao, setObservacao] = useState("");

  const toggleIngrediente = (id: number) => {
    setIngredientes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, incluso: !item.incluso } : item
      )
    );
  };

  const toggleAdicional = (id: number) => {
    setAdicionais((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selecionado: !item.selecionado } : item
      )
    );
  };

  const precoBase = 24.9;
  const precoTotal =
    precoBase +
    adicionais
      .filter((a) => a.selecionado)
      .reduce((sum, a) => sum + a.preco, 0);

  const handleAddToCart = () => {
    const novoProduto = {
      id: Date.now().toString(),
      name: produto.nome,
      price: precoTotal,
      ingredientes: ingredientes.filter((i) => i.incluso),
      adicionais: adicionais.filter((a) => a.selecionado),
      observacao,
    };

    const novoCarrinho = [...cartAtual, novoProduto];
    navigation.navigate("Carrinho", { cart: novoCarrinho, tipoLocal: route.params?.tipoLocal });
  };

  const produto = {
    nome: "Smash da Casa",
    descricao:
      "Pão brioche, carne 160g, cheddar, alface, tomate, cebola roxa e molho da casa.",
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header customizado */}
      <Appbar.Header style={styles.head}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white"/>
        <Appbar.Content title="Descrição do Produto" color="white"/>
      </Appbar.Header>

      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/ic_burguer.png")}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{produto.nome}</Text>
        <Text style={styles.productDesc}>{produto.descricao}</Text>

        {/* Ingredientes selecionáveis */}
        <Text style={styles.titleSection}>Ingredientes</Text>
        {ingredientes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.option, !item.incluso && styles.removedOption]}
            onPress={() => toggleIngrediente(item.id)}
          >
            <Text
              style={[
                styles.optionText,
                !item.incluso && styles.textRemovedOption,
              ]}
            >
              {item.nome}
            </Text>
            <Text style={styles.toggleText}>
              {item.incluso ? "✓ Incluso" : "Remover"}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Ingredientes adicionais */}
        <Text style={styles.titleSection}>Adicionais</Text>
        {adicionais.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.option, item.selecionado && styles.selectedOption]}
            onPress={() => toggleAdicional(item.id)}
          >
            <Text
              style={[
                styles.optionText,
                item.selecionado && styles.textSelectedOption,
              ]}
            >
              {item.nome} (+ R$ {item.preco.toFixed(2)})
            </Text>
          </TouchableOpacity>
        ))}

        {/* Observações */}
        <Text style={styles.titleSection}>Observações</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Ex: tirar cebola, ponto da carne, etc."
          value={observacao}
          onChangeText={setObservacao}
        />

        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total: R$ {precoTotal.toFixed(2)}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.textButton}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
