import React, { createContext, useContext, useState, ReactNode } from "react";

interface CreditoContextData {
  credito: number;
  adicionarCredito: (valor: number) => void;
  removerCredito: (valor: number) => boolean;
}

const CreditoContext = createContext<CreditoContextData>(
  {} as CreditoContextData
);

export function CreditoProvider({ children }: { children: ReactNode }) {
  const [credito, setCredito] = useState<number>(0);

  const adicionarCredito = (valor: number) => {
    setCredito((prevCredito) => prevCredito + valor);
  };

  const removerCredito = (valor: number): boolean => {
    if (credito >= valor) {
      setCredito((prevCredito) => prevCredito - valor);
      return true;
    }
    return false;
  };

  return (
    <CreditoContext.Provider
      value={{ credito, adicionarCredito, removerCredito }}
    >
      {children}
    </CreditoContext.Provider>
  );
}

export function useCredito() {
  const context = useContext(CreditoContext);
  if (!context) {
    throw new Error("useCredito deve ser usado dentro  de um CreditoProvider");
  }
  return context;
}