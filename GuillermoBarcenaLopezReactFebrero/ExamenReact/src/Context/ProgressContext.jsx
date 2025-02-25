import { createContext, useState } from 'react';

// Crear el contexto
export const ProgressContext = createContext();

// Proveedor del contexto
export function ProgressProvider({ children }) {
    const [progress, setProgress] = useState(0);

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
}
