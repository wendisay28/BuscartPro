import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, UserType } from '@/services/auth';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Definir el tipo del contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  updateUserType: (userType: UserType) => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente proveedor
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,  // Asegurar que id esté definido
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  const updateUserType = async (userType: UserType) => {
    if (!user) return;
    
    // Aquí iría la llamada a la API para actualizar el tipo de usuario
    console.log('Actualizando tipo de usuario a:', userType);
    
    // Actualizar el usuario localmente
    setUser({
      ...user,
      userType
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    updateUserType,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    !loading ? children : null
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
}

export default AuthContext;
