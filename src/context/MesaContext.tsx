import React, { createContext, useState, ReactNode, useContext} from "react";

type MesaContextType = {
    mesa: string,
    setMesa: (mesa: string) => void;
};

const MesaContext = createContext<MesaContextType>({
    mesa: "",
    setMesa: () => {},
});

export const MesaProvider = ({ children }: { children: ReactNode }) => {
    const [ mesa, setMesa ] = useState("");
    return (
        <MesaContext.Provider value={{mesa, setMesa}}>
            {children}
        </MesaContext.Provider>
    );
};

export const useMesa = () => useContext(MesaContext);