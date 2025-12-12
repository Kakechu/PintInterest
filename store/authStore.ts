import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  isLoggedIn: boolean;
  shouldCreateAccount: boolean;
  hasCompletedOnboarding: boolean;

  idToken: string | null;
  userId: string | null;

  createAccount: () => void;
  logIn: (token: string, userId: string) => void;
  logOut: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      shouldCreateAccount: true,
      hasCompletedOnboarding: false,
      idToken: null,
      userId: null,
      createAccount: () => {
        set((state) => {
          return {
            ...state,
            shouldCreateAccount: false,
          };
        });
      },
      logIn: (token, userId) => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
            idToken: token,
            userId: userId,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
            shouldCreateAccount: false,
            idToken: null,
            userId: null,
          };
        });
      },
      completeOnboarding: () => {
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: true,
          };
        });
      },
      resetOnboarding: () => {
        set((state) => {
          return {
            ...state,
            hasCompletedOnboarding: false,
          };
        });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
