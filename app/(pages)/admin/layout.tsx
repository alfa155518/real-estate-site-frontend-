"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Search,
  Menu,
  X,
  LogOut,
  BarChart3,
  MessageSquare,
  Heart,
  Tag,
  MapPin,
  House,
  Clock,
  Calendar,
} from "lucide-react";
import styles from "@/sass/layout/adminLayout.module.scss";
import { SidebarItem } from "@/types/admin";

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "properties",
    label: "العقارات",
    icon: Building2,
    href: "/admin/properties",
    badge: 12,
  },
  {
    id: "users",
    label: "المستخدمين",
    icon: Users,
    href: "/admin/users",
    badge: 15,
  },
  {
    id: "analytics",
    label: "التحليلات",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    id: "reviews",
    label: "التقييمات",
    icon: MessageSquare,
    href: "/admin/reviews",
    badge: 20,
  },
  {
    id: "favorites",
    label: "المفضلات",
    icon: Heart,
    href: "/admin/favorites",
  },
  {
    id: "categories",
    label: "التصنيفات",
    icon: Tag,
    href: "/admin/categories",
    badge: 9,
  },
  {
    id: "locations",
    label: "المواقع",
    icon: MapPin,
    href: "/admin/locations",
  },
  {
    id: "settings",
    label: "الإعدادات",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Fix hydration error by only showing time after mount
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter sidebar items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return sidebarItems.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  // Navigate to selected page
  const handleNavigateToPage = (href: string) => {
    router.push(href);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.searchBar}`)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <motion.aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.open : styles.collapsed
        }`}
        initial={{ x: 0 }}
        animate={{ x: sidebarOpen ? 0 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo */}
        <div className={styles.logo}>
          <motion.div
            className={styles.logoIcon}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <House />
          </motion.div>
          <div className={styles.logoText}>
            <h2>لوحة تحكم</h2>
            <p>نظام إدارة العقارات</p>
          </div>
          <motion.button
            className={styles.sidebarCloseBtn}
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <div className={styles.navSection}>
            <div className={styles.sectionTitle}>القائمة الرئيسية</div>
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`${styles.navItem} ${
                  isActive(item.href) ? styles.active : ""
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={item.href} onClick={() => setSidebarOpen(false)}>
                  <item.icon className={styles.icon} />
                  <span className={styles.label}>{item.label}</span>
                  {item.badge && (
                    <motion.span
                      className={styles.badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        delay: 0.2,
                      }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <motion.div
          className={styles.userProfile}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.profileContent}>
            <motion.div
              className={styles.avatar}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              أ
            </motion.div>
            <div className={styles.profileInfo}>
              <p className={styles.name}>أحمد حسوب</p>
              <p className={styles.role}>مدير النظام</p>
            </div>
            <motion.button
              className={styles.logoutBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <motion.header
          className={styles.header}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={styles.headerLeft}>
            <motion.button
              className={styles.menuToggle}
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {!sidebarOpen && <Menu />}
            </motion.button>
            <div className={styles.pageTitle}>
              <h1>لوحة التحكم</h1>
              <p>مرحباً بك في نظام إدارة عالم العقارات</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            {/* Date and Time Display */}
            <motion.div
              className={styles.dateTimeDisplay}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className={styles.dateTime}>
                <div className={styles.timeSection}>
                  <Clock size={16} />
                  <span>
                    {mounted
                      ? format(currentDateTime, "HH:mm:ss", { locale: ar })
                      : "--:--:--"}
                  </span>
                </div>
                <div className={styles.dateSection}>
                  <Calendar size={16} />
                  <span>
                    {mounted
                      ? format(currentDateTime, "dd MMMM yyyy", { locale: ar })
                      : "-- ----- ----"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Search Bar with Results */}
            <motion.div
              className={styles.searchBar}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <input
                type="text"
                name="search"
                placeholder="ابحث عن صفحة أو محتوى..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchResults(true)}
              />
              <Search className={styles.searchIcon} size={20} />

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div
                    className={styles.searchResults}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredItems.length > 0 ? (
                      <>
                        <div className={styles.searchResultsHeader}>
                          نتائج البحث ({filteredItems.length})
                        </div>
                        {filteredItems.map((item) => (
                          <motion.div
                            key={item.id}
                            className={styles.searchResultItem}
                            onClick={() => handleNavigateToPage(item.href)}
                            whileHover={{ scale: 1.02, x: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <item.icon
                              size={18}
                              className={styles.resultIcon}
                            />
                            <div className={styles.resultContent}>
                              <span className={styles.resultLabel}>
                                {item.label}
                              </span>
                              <span className={styles.resultPath}>
                                {item.href}
                              </span>
                            </div>
                            {item.badge && (
                              <span className={styles.resultBadge}>
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </>
                    ) : (
                      <div className={styles.noResults}>
                        <Search size={24} />
                        <p>لا توجد نتائج للبحث</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              display: "none",
            }}
            className="mobile-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
