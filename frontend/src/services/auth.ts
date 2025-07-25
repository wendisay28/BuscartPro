// src/services/auth.ts
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';

export type UserType = 'general' | 'artist' | 'company';

export interface User {
  id: string;  // Alias para uid para mantener consistencia
  uid: string;
  email: string | null;
  displayName: string | null;
  userType?: UserType;
  profileImageUrl?: string;
  city?: string;
  bio?: string;
  [key: string]: any;  // Para mantener compatibilidad con propiedades adicionales
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType?: UserType;
}

export interface SignInData {
  email: string;
  password: string;
}

const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
});

export const authService = {
  async signUp({ email, password, firstName, lastName, userType = 'general' }: SignUpData): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar el perfil del usuario con el nombre completo y tipo de usuario
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim(),
        photoURL: userType === 'artist' ? '/default-avatar-artist.svg' : 
                 (userType === 'company' ? '/default-avatar-company.svg' : 
                 '/default-avatar.svg')
      });

      // Aquí podrías hacer una llamada a tu backend para guardar más información del usuario
      // await api.post('/users', { uid: user.uid, email, firstName, lastName });

      return mapFirebaseUserToUser(user);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },

  async signIn({ email, password }: SignInData): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUserToUser(user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  },

  getCurrentUser(): User | null {
    const user = auth.currentUser;
    return user ? mapFirebaseUserToUser(user) : null;
  },
};
