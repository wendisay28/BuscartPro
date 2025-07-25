import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User, UserType } from '@/services/auth';

// Tipo del contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  updateUserType: (userType: UserType) => Promise<void>;
}

// Crear contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async (firebaseUser: FirebaseUser) => {
      const userData: User = {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        userType: "general",
      };

      if (isMounted) setUser(userData);

      try {
        const { doc, getDoc, getFirestore } = await import("firebase/firestore");
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

        if (userDoc.exists() && isMounted) {
          setUser({
            ...userData,
            ...userDoc.data(),
            userType: userDoc.data()?.userType || "general",
          });
        }
      } catch (error) {
        console.error("Error al cargar datos adicionales:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        loadUserData(firebaseUser);
      } else {
        if (isMounted) setUser(null);
      }
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw error;
    }
  };

  const updateUserType = async (userType: UserType) => {
    if (!user) return;

    try {
      const { doc, setDoc, getFirestore } = await import("firebase/firestore");
      const db = getFirestore();
      const userRef = doc(db, "users", user.id);

      await setDoc(userRef, { userType }, { merge: true });

      setUser({ ...user, userType });
    } catch (error) {
      console.error("Error al actualizar tipo de usuario:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
