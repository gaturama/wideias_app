import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Pedido {
  nome: string;
  preco?: number;
  quantidade: number;
}

interface PedidosContextType {
  pedidos: Pedido[];
  addPedidos: (novosPedidos: Pedido[]) => void;
}

const PedidosContext = createContext<PedidosContextType>({
  pedidos: [],
  addPedidos: () => {},
});

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const addPedidos = (novosPedidos: Pedido[]) => {
    setPedidos((prev) => {
      const atualizado = [...prev];
      novosPedidos.forEach((novo) => {
        const existente = atualizado.find((p) => p.nome === novo.nome);
        if (existente) {
          existente.quantidade += novo.quantidade;
          existente.preco = novo.preco ?? existente.preco;
        } else {
          atualizado.push(novo);
        }
      });
      return atualizado;
    });
  };

  return (
    <PedidosContext.Provider value={{ pedidos, addPedidos }}>
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => useContext(PedidosContext);
