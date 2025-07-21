import { create } from "zustand";

type User = {
  _id: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
};

type UserStore = {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const STORAGE_KEY = "userData";

const getUserFromStorage = (): { user: User; token: string } | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.user && parsed?.token) return parsed;
    return null;
  } catch (e) {
    console.error("⚠️ Invalid user data in localStorage", e);
    return null;
  }
};

export const useUserStore = create<UserStore>((set) => {
  const stored = getUserFromStorage();

  return {
    user: stored?.user || null,
    token: stored?.token || null,
    isAdmin: stored?.user?.isAdmin === true,
    isLoggedIn: !!stored?.token,
    login: (user, token) => {
      console.log("🧩 user received in login:", user);

      set({
        user,
        token,
        isAdmin: user.isAdmin === true, // עדכון כאן
        isLoggedIn: true,
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
      } catch (e) {
        console.error("⚠️ Failed to save user to localStorage", e);
      }
    },
    logout: () => {
      set({
        user: null,
        token: null,
        isAdmin: false,
        isLoggedIn: false,
      });
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error("⚠️ Failed to remove user from localStorage", e);
      }
    },
  };
});