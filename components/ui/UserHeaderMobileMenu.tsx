import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/sass/layout/header.module.scss";
import useUserHeader from "@/hooks/useUserHeader";
import { Search, LogIn, LogOut, User } from "lucide-react";
import { HeaderMobileMenuProps } from "@/types/userHeader";
export default function UserHeaderMobileMenu({
  setIsMobileMenuOpen,
}: HeaderMobileMenuProps) {
  // user header custom hook
  const {
    pathname,
    token,
    navLinks,
    register,
    handleSubmit,
    handleSearchSubmit,
    handleLinkClick,
    handleLogout,
  } = useUserHeader();

  return (
    <motion.div
      className={styles.mobileMenu}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.mobileNavLinks}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navLink} ${
              pathname === link.href ? styles.active : ""
            }`}
            onClick={handleLinkClick}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      <form
        onSubmit={handleSubmit((data) => {
          handleSearchSubmit(data);
          setIsMobileMenuOpen(false);
        })}
        className={styles.searchForm}
      >
        <input
          type="text"
          autoComplete="search"
          placeholder="ابحث عن عقار..."
          {...register("search", { required: true })}
          aria-label="Search properties"
        />
        <button type="submit" aria-label="Search">
          <Search size={18} />
        </button>
      </form>

      <div className={styles.mobileAuthButtons}>
        {token ? (
          <>
            <Link
              href="/profile"
              className={`${styles.profileButton} ${styles.mobileButton}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={18} />
              <span>الملف الشخصي</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className={`${styles.logoutButton} ${styles.mobileButton}`}
              aria-label="تسجيل الخروج"
            >
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className={`${styles.loginButton} ${styles.mobileButton}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LogIn size={18} />
            <span>تسجيل الدخول</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
