export type RootStackParamList = {
  Login: undefined;
  Main: {
    screen: "Pedido" | "Perfil" | "Produto" | "Credito";
    params?: { pedidos?: any[] };
  };
  Produto: { tipo?: "restaurante" | "evento" };
  Perfil: undefined;
  Carrinho: { cart: any[] };
  Pagamento: { cart: any[]; tipoLocal?: "restaurante" | "evento" };
  QrCode: {
    pedido: {
      id: string;
      usuario: string;
      produtos: { nome: string; quantidade: number }[];
      valorTotal: number;
    };
  };
  Cadastro: undefined;
  Pix: { pedido: any };
  Mesa: undefined;
  DescricaoProduto: undefined;
  Localizacao: undefined;
  TipoLocal: undefined;
  Credito: undefined;
  Pedido: { pedidos?: any[] };
};