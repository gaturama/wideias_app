export type RootTabParamList = {
  Home: { pedidos: { nome: string; quantidade: number; locationId: string | undefined }[] };
  Perfil: undefined;
  Produto: { locationId?: string } | undefined;
  Credito: undefined;
  Historico: undefined;
  Carrinho: { cart: any[]; localizacao?: undefined | string;  };
};