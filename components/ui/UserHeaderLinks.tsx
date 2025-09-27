import useUserHeader from "@/hooks/useUserHeader";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/sass/layout/header.module.scss";

export default function UserHeaderLinks() {
  // use user header custom hook
  const { pathname, navLinks, handleLinkClick } = useUserHeader();

  return navLinks.map((link, index) => (
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
            duration: 0.3,
          },
        },
      }}
    >
      <Link
        href={link.href}
        className={`${styles.navLink} ${
          pathname === link.href ? styles.active : ""
        }`}
        onClick={handleLinkClick}
      >
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </motion.div>
  ));
}
