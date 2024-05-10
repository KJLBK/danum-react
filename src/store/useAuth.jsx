import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuth = create(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
		}),
		{
			name: 'auth-storage',
			storage: localStorage,
			serialize: (state) => JSON.stringify(state),
			deserialize: (str) => JSON.parse(str),
		},
	),
)

export default useAuth
