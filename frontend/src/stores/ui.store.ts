'use client';

import { create } from 'zustand';

export interface UIStore {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,

  openMobileMenu: () => set({ isMobileMenuOpen: true, isCartOpen: false, isSearchOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
      isCartOpen: false,
      isSearchOpen: false,
    })),

  openCart: () => set({ isCartOpen: true, isMobileMenuOpen: false, isSearchOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
      isMobileMenuOpen: false,
      isSearchOpen: false,
    })),

  openSearch: () => set({ isSearchOpen: true, isMobileMenuOpen: false, isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
      isMobileMenuOpen: false,
      isCartOpen: false,
    })),

  closeAll: () => set({ isMobileMenuOpen: false, isCartOpen: false, isSearchOpen: false }),
}));
