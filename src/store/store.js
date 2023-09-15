import { create } from "zustand";

export const useStore = create((set) => ({
    imageData: '',
    setImageData: (imageData) => set({ imageData }),
    resetImageData: () => set({ imageData: '' }),
}))