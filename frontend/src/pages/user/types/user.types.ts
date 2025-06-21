export type ProfileUserType = "general" | "artist" | "company";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  city: string;
  bio?: string;
  userType: ProfileUserType;
};
