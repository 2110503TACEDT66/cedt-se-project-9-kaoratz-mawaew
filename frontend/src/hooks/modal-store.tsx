import { create } from 'zustand';

export type ModalType = "logout"

interface ModalState {
    type : ModalType | null;
    isOpen: boolean;    
    openModal: (type: ModalType) => void;
    closeModal: () => void;
};

export const useModal = create<ModalState>()((set) => ({
    type: null,
    isOpen: false,
    openModal: (type) => set({ type, isOpen: true }),
    closeModal: () => set({ type: null, isOpen: false }),
}));
