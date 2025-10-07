export type RootStackParamList = {
  Login: undefined
  Home: undefined
  Perfil: undefined
  Carrinho: {cart: any[] };
  Pagamento: undefined
  QrCode: {
    pedido: {
      id: string;
      usuario: string;
      produtos: { nome: string; quantidade: number }[];
      valorTotal: number;
    };
  };
  Cadastro: undefined
  Pix: { pedido: any };
  Mesa: undefined
}