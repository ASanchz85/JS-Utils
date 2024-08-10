import { create } from 'zustand'

const toastStore = (set) => ({
  toasts: [],

  addToast: (message, type = 'info', duration = 3000) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message, type, duration }]
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
})

export const useToastStore = create(toastStore)
