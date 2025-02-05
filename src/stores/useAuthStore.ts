import { create } from "zustand";

interface AuthStore {
  user: {
    id: string;
    email: string;
    nickname: string;
  } | null;
  setUser: (
    user: {
      id: string;
      email: string;
      nickname: string;
      img_url: string;
    } | null
  ) => void;
}

const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;