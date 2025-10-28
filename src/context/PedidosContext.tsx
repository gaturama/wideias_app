import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Pedido {
  id: string;
  nome: string;
  preco?: number;
  quantidade: number;
  local?: string;
  dataHora?: string;
}

interface PedidosContextType {
  pedidos: Pedido[];
  historico: Pedido[];
  addPedidos: (novosPedidos: Pedido[]) => void;
  concluirPedido: (pedido: Pedido) => void;
}

const PedidosContext = createContext<PedidosContextType>({
  pedidos: [],
  historico: [],
  addPedidos: () => {},
  concluirPedido: () => {},
});

export const PedidosProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [historico, setHistorico] = useState<Pedido[]>([]);

  const addPedidos = (novosPedidos: Pedido[]) => {
    setPedidos((prev) => [...prev, ...novosPedidos]);
  };

  const concluirPedido = (pedido: Pedido) => {
    const dataHora = new Date().toLocaleString("pt-BR");
    setHistorico((prev) => [
      ...prev,
      { ...pedido, dataHora, local: pedido.local ?? "Local desconhecido" },
    ]);
    setPedidos((prev) => prev.filter((p) => p.id !== pedido.id));
  };

  return (
    <PedidosContext.Provider
      value={{ pedidos, historico, addPedidos, concluirPedido }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => useContext(PedidosContext);