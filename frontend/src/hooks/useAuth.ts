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
    const loadUserData = async (firebaseUser: any) => {
      try {
        // Primero actualizamos el estado con los datos básicos de Firebase
        // para que la autenticación se marque como exitosa rápidamente
        const userData: any = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          userType: 'general' // Valor por defecto
        };
        
        setUser(userData);
        
        // Luego cargamos los datos adicionales de Firestore
        try {
          const { doc, getDoc, getFirestore } = await import('firebase/firestore');
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            setUser({
              ...userData,
              ...userDoc.data(),
              userType: userDoc.data()?.userType || 'general'
            });
          }
        } catch (error) {
          console.error('Error al cargar datos adicionales del usuario:', error);
          // No hacemos nada aquí, ya que ya tenemos los datos básicos
        }
      } catch (error) {
        console.error('Error en la autenticación:', error);
        setUser(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        loadUserData(firebaseUser);
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

  const updateUserType = async (userType: UserType): Promise<void> => {
    if (!user) return;
    
    try {
      // Actualizar en Firestore
      const { doc, setDoc, getFirestore } = await import('firebase/firestore');
      const db = getFirestore();
      const userRef = doc(db, 'users', user.id);
      
      await setDoc(userRef, { userType }, { merge: true });
      
      // Actualizar el usuario localmente
      setUser({
        ...user,
        userType
      });
      
      // No retornamos nada (void)
      return;
    } catch (error) {
      console.error('Error al actualizar el tipo de usuario:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    updateUserType,
  } as const;

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
