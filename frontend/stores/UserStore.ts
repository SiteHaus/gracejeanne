import { create } from "zustand";
import { UserContext } from "@sitehaus/client-sdk";
import { persist } from "zustand/middleware";

interface UserState {
  authorized: boolean;
  user: UserContext;
  isAdmin: boolean;
  setAuthorized: (val: boolean) => void;
  setUser: (userData: UserContext) => void;
  setAdmin: (val: boolean) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      authorized: false,
      user: {
        userId: "",
        email: "",
        firstName: "",
        lastName: "",
        isVerified: false,
        status: "",
        sessionId: "",
        clientId: "",
        permissions: [],
      },
      isAdmin: false,
      setUser: (userData: UserContext) => set({ user: userData }),
      setAdmin: (val: boolean) => set({ isAdmin: val }),
      setAuthorized: (val: boolean) => set({ authorized: val }),
    }),
    { name: "user-store" },
  ),
);
