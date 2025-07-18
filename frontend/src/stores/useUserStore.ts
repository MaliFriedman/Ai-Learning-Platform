import { create } from "zustand";

type User = {
  _id: string;
  name: string;
  phone: string;
  token: string;
};

type UserStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: (user) => {
    set({ user });
    localStorage.setItem("token", user.token); 
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
}));
