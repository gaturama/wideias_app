export type RootStackParamList = {
  Login: undefined;
  Main: {
    screen: "Pedido" | "Perfil" | "Produto" | "Credito";
    params?: { pedidos?: any[]; localizacao?: { latitude: number; longitude: number }};
    merge?: boolean;
  };
  Produto: { tipo?: "restaurante" | "evento" };
  Perfil: undefined;
  Carrinho: { cart: any[] };
  Pagamento: { cart: any[] };
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
  Credito: undefined;
  Pedido: { pedidos?: any[]; localizacao?: { latitude: number; longitude: number } };
  Localizacao: undefined;
  QrScanner: undefined;
  Historico: undefined;
  DividirConta: undefined;
};