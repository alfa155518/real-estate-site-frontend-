'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Search, Menu, X, Home, Building, Heart, LogIn, LogOut, User, Info, Phone } from 'lucide-react';
import Image from 'next/image';
import styles from '@/sass/layout/header.module.scss';

type FormData = {
  search: string;
};

type NavLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

 const user = true;
 
 const logout = () => {
    console.log('logout');
 }
  
  const { register, handleSubmit, reset } = useForm<FormData>();
  
  const navLinks: NavLink[] = [
    { name: 'الرئيسية', href: '/', icon: <Home size={20} /> },
    { name: 'العقارات', href: '/realstate', icon: <Building size={20} /> },
    { name: 'المفضلة', href: '/favorites', icon: <Heart size={20} /> },
    { name: 'عننا', href: '/aboutUs', icon: <Info size={20} /> },
    { name: 'تواصل معنا', href: '/support', icon: <Phone size={20} /> },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const onSubmit = (data: FormData) => {
    console.log('Search:', data.search);
    // Handle search submission
    reset();
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
       logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
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
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial="navLinkVariant"
              animate="navLinkVariantVisible"
              variants={{
                navLinkVariant: { opacity: 0, y: -10 },
                navLinkVariantVisible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.1 * index,
                    duration: 0.3 
                  } 
                }
              }}
            >
              <Link 
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Search and Auth Buttons */}
        <div className={styles.actions}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
            <input
              type="text"
              autoComplete='search'
              placeholder="ابحث عن عقار..."
              {...register('search', { required: true })}
              aria-label="Search properties"
            />
            <button type="submit" aria-label="Search">
              <Search size={18} />
            </button>
          </form>
          
          <div className={styles.authButtons}>
            {user ? (
              <>
                <Link href="/profile" className={styles.profileButton}>
                  <User size={18} />
                  <span>الملف الشخصي</span>
                </Link>
                <button 
                //   onClick={handleLogout} 
                  className={styles.logoutButton}
                  aria-label="تسجيل الخروج"
                >
                  <LogOut size={18} />
                  <span>تسجيل الخروج</span>
                </button>
              </>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                <LogIn size={18} />
                <span>تسجيل الدخول</span>
              </Link>
            )}
          </div>
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
                  className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
              <input
                type="text"
                autoComplete="search"
                placeholder="ابحث عن عقار..."
                {...register('search', { required: true })}
                aria-label="Search properties"
              />
              <button type="submit" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
            
            <div className={styles.mobileAuthButtons}>
              {user ? (
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
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;