"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import styles from "@/sass/layout/header.module.scss";
import useUserHeader from "@/hooks/useUserHeader";
import UserHeaderButtonsAction from "@/components/ui/UserHeaderButtonsAction";
import UserHeaderLinks from "@/components/ui/UserHeaderLinks";
import UserHeaderMobileMenu from "../components/ui/UserHeaderMobileMenu";

const Header = () => {
  // user header custom hook
  const {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
  } = useUserHeader();

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.webp"
            alt="Real Estate Logo"
            width={400}
            height={400}
            priority
          />
        </Link>
        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <UserHeaderLinks />
        </div>
        {/* Search and Auth Buttons */}
        <div className={styles.actions}>
          <UserHeaderButtonsAction />
        </div>
        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <UserHeaderMobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
