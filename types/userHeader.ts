import { ReactNode } from 'react';


export type UserHeaderFormData = {
    search: string;
};

export interface HeaderMobileMenuProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export interface NavLink {
    name: string;
    href: string;
    icon: ReactNode;
}

export interface MobileUserHeader {
    isMobileMenuOpen: boolean;
    navLinks: NavLink[];
    pathname: string;
}
