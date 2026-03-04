import { create } from 'zustand';

interface NavigationState {
    activeSection: string;
    isMenuOpen: boolean;
    setActiveSection: (section: string) => void;
    setMenuOpen: (open: boolean) => void;
    toggleMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    activeSection: 'home',
    isMenuOpen: false,
    setActiveSection: (section) => set({ activeSection: section }),
    setMenuOpen: (open) => set({ isMenuOpen: open }),
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
