// frontend/src/hooks/use-navbar.ts
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface UseNavbarReturn {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  openDropdown: string | null;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleDropdown: (key: string) => void;
  closeDropdowns: () => void;
}

export function useNavbar(): UseNavbarReturn {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };
  const closeDropdowns = () => setOpenDropdown(null);

  return {
    isScrolled,
    isMobileMenuOpen,
    isSearchOpen,
    openDropdown,
    dropdownRef,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch,
    closeSearch,
    toggleDropdown,
    closeDropdowns,
  };
}