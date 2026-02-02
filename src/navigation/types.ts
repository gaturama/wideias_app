import { NavigatorScreenParams } from "@react-navigation/native";

export type RootTabParamList = {
  Home: { locationId?: string } | undefined;
  Perfil: undefined;
  Produto: { locationId?: string } | undefined;
  Credito: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<RootTabParamList>;
  Produto: { tipo?: "restaurante" | "evento" };
  Perfil: undefined;
  Carrinho: { cart: any[]; localizacao?: undefined | string; };
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
  Pedido: { pedidos?: any[]; localizacao?: undefined | string };
  Localizacao: undefined;
  QrScanner: undefined;
  Historico: undefined;
  DividirConta: undefined;
  LoadingScreen: undefined;
};