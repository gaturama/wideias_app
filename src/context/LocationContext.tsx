import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextData {
  locationId: string | null;
  locationName: string | null;
  tipoLocal: 'restaurante' | 'evento' | null;
  setLocationData: (id: string, name: string, tipo: 'restaurante' | 'evento') => void;
  clearLocationData: () => void;
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationId, setLocationId] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [tipoLocal, setTipoLocal] = useState<'restaurante' | 'evento' | null>(null);

  const setLocationData = (id: string, name: string, tipo: 'restaurante' | 'evento') => {
    console.log(" locationId:", id);
    setLocationId(id);
    setLocationName(name);
    setTipoLocal(tipo);
  };

  const clearLocationData = () => {
    console.log("Limpando dados de localização");
    setLocationId(null);
    setLocationName(null);
    setTipoLocal(null);
  };

  return (
    <LocationContext.Provider
      value={{
        locationId,
        locationName,
        tipoLocal,
        setLocationData,
        clearLocationData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation deve ser usado dentro de LocationProvider');
  }
  return context;
}