import { createStore } from "zustand/vanilla"
import { useStore } from "zustand"
import { User } from "@/models"
import { persist } from "zustand/middleware"

const defaultUser: User = {
  username: "",
  token: "",
  level: "",
  pendingToLevelUp: false,
}

export interface UserState {
  user: User,
  login: (newUser: User) => void,
  logout: () => void,
  setUserPendingToLevelUp: () => void,
  clearPendingToLevelUp: () => void,
}

export const userStore = createStore<UserState>()(
  persist(
    (set) => ({
      user: defaultUser,
      login: (newUser: User) => set({ user: newUser }),
      logout: () => set({ user: defaultUser }),
      setUserPendingToLevelUp: () => set((state) => ({
        user: { ...state.user, pendingToLevelUp: true },
      })),
      clearPendingToLevelUp: () => set((state) => ({
        user: { ...state.user, pendingToLevelUp: false },
      })),
    }),
    {
      name: "user-storage",
    },
  )
)

export function useUserStore(): UserState
export function useUserStore<T>(selector: (state: UserState) => T): T
export function useUserStore<T>(selector?: (state: UserState) => T) {
  return useStore(userStore, selector!)
}
