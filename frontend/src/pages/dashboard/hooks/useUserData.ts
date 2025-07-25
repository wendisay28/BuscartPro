import { useAuth } from "@/hooks/useAuth";
import { User } from "../types";

export const useUserData = () => {
  const { user } = useAuth();

  const getUserDisplayName = (): string => {
    if (!user) return 'Invitado';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario';
  };

  const getUserInitials = (): string => {
    if (!user) return 'U';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const getUserType = (): string => {
    if (!user?.userType) return 'Invitado';
    const types: Record<string, string> = {
      artist: 'Artista',
      company: 'Empresa',
      general: 'Usuario General'
    };
    return types[user.userType] || 'Usuario';
  };

  return {
    user,
    getUserDisplayName,
    getUserInitials,
    getUserType
  };
};
