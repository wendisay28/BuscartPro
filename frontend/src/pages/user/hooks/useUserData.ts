import { useAuth } from "@/hooks/useAuth";

export function useUserData() {
  const { user } = useAuth();

  const getUserType = (): "general" | "artist" | "company" => {
    return (user?.userType || "general") as "general" | "artist" | "company";
  };

  return {
    user,
    userType: getUserType(),
  };
}
