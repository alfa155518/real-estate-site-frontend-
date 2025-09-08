"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { 
  Home, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Search, 
  Info, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Clock, 
  Send,
  ChevronDown,
  Loader2
} from 'lucide-react';
import styles from '@/sass/layout/footer.module.scss';

interface FooterLink {
  id: string;
  text: string;
  icon: React.ReactNode;
  href: string;
}

interface SocialLink {
  id: string;
  icon: React.ReactNode;
  href: string;
  label: string;
}

type FormData = {
  email: string;
};

const Footer: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();
  const [isMenuOpen, setIsMenuOpen] = useState<Record<string, boolean>>({
    quickLinks: true,
    contactInfo: true,
    newsletter: true
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (menu: string) => {
    setIsMenuOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      // Here you would typically make an API call to subscribe the user
      console.log('Subscribing with email:', data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      reset();
      
      // Reset subscription message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks: FooterLink[] = [
    { id: 'home', text: 'الرئيسية', icon: <Home width={16} height={16} />, href: '#' },
    { id: 'properties', text: 'تصفح العقارات', icon: <Search width={16} height={16} />, href: '#' },
    { id: 'about', text: 'من نحن', icon: <Info width={16} height={16} />, href: '#' },
    { id: 'contact', text: 'اتصل بنا', icon: <Phone width={16} height={16} />, href: '#' },
    { id: 'blog', text: 'المدونة', icon: <MessageSquare width={16} height={16} />, href: '#' },
  ];

  const socialLinks: SocialLink[] = [
    { id: 'facebook', icon: <Facebook />, href: '#', label: 'فيسبوك' },
    { id: 'twitter', icon: <Twitter />, href: '#', label: 'تويتر' },
    { id: 'instagram', icon: <Instagram />, href: '#', label: 'إنستغرام' },
    { id: 'linkedin', icon: <Linkedin />, href: '#', label: 'لينكد إن' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      } as Transition
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer 
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.logoSection} variants={itemVariants}>
          <Link href="/" className={styles.logo}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home />
            </motion.div>
            <span>عالم العقارات</span>
          </Link>
          <p className={styles.description}>
            نقدم لك أفضل العقارات في مصر. نساعدك في العثور على منزل أحلامك بسهولة وأمان.
          </p>
          <div className={styles.socialIcons}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.id}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                rel="noopener noreferrer"
                target="_blank"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.linksSection} variants={itemVariants}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => toggleMenu('quickLinks')}
            aria-expanded={isMenuOpen.quickLinks}
            aria-controls="quick-links-menu"
          >
            <h3>روابط سريعة</h3>
            <motion.span
              animate={{ rotate: isMenuOpen.quickLinks ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className='cursor-pointer'/>
            </motion.span>
          </button>
          <AnimatePresence>
            {(!isMobile || isMenuOpen.quickLinks) && (
              <motion.ul
                id="quick-links-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  transition: { duration: 0.3 }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: { duration: 0.2 }
                }}
                className={styles.linksList}
              >
                {quickLinks.map((link) => (
                  <motion.li 
                    key={link.id}
                    whileHover={{ x: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link href={link.href}>
                      {link.icon}
                      <span>{link.text}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className={styles.contactInfo} variants={itemVariants}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => toggleMenu('contactInfo')}
            aria-expanded={isMenuOpen.contactInfo}
            aria-controls="contact-info-menu"
          >
            <h3>معلومات الاتصال</h3>
            <motion.span
              animate={{ rotate: isMenuOpen.contactInfo ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className='cursor-pointer'/>
            </motion.span>
          </button>
          <AnimatePresence>
            {(!isMobile || isMenuOpen.contactInfo) && (
              <motion.div
                id="contact-info-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  transition: { duration: 0.3 }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: { duration: 0.2 }
                }}
                className={styles.contactInfoList}
              >
                <p>
                  <MapPin />
                  <span>القاهرة, مصر</span>
                </p>
                <p>
                  <Phone />
                  <span>201555187474+</span>
                </p>
                <p>
                  <Mail />
                  <span>info@realestate.com</span>
                </p>
                <p>
                  <Clock />
                  <span>الأحد - الخميس: 9 ص - 5 م</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className={styles.newsletter} variants={itemVariants}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => toggleMenu('newsletter')}
            aria-expanded={isMenuOpen.newsletter}
            aria-controls="newsletter-menu"
          >
            <h3>النشرة البريدية</h3>
            <motion.span
              animate={{ rotate: isMenuOpen.newsletter ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className='cursor-pointer' />
            </motion.span>
          </button>
          <AnimatePresence>
            {(!isMobile || isMenuOpen.newsletter) && (
              <motion.div
                id="newsletter-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  transition: { duration: 0.3 }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: { duration: 0.2 }
                }}
                className={styles.newsletterContent}
              >
                <p>اشترك في نشرتنا البريدية لتصلك أحدث العروض والعقارات المتاحة</p>
                <form className={styles.newsletterForm} onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.formGroup}>
                    <input 
                      type="email" 
                      placeholder="البريد الإلكتروني" 
                      dir="rtl" 
                      {...register('email', {
                        required: 'البريد الإلكتروني مطلوب',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'البريد الإلكتروني غير صالح'
                        }
                      })}
                      className={`${errors.email ? styles.inputError : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <span className={styles.errorMessage}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className={styles.loader} size={16} />
                    ) : (
                      <>
                        <span>اشتراك</span>
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
                <AnimatePresence>
                  {isSubscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.subscriptionMessage}
                    >
                      شكراً لك! تم الاشتراك بنجاح.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className={styles.copyright}
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة عالم العقارات</p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;