import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export default function useAuth() {
	create(
		persist(
			(set) => ({
				token: null,
				setToken: (token) => set({ token }),
			}),
			{
				name: 'auth-storage', // 상태를 저장할 때 사용할 키 이름
				storage: localStorage, // 또는 localStorage를 사용할 수 있습니다.
			},
		),
	)
}
