"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, UserCircle } from "lucide-react";
import useUserProfile from "@/hooks/useUserProfile";
import PasswordsTap from "./PasswordsTap";
import PersonalTap from "./PersonalTap";
import styles from "@/sass/pages/profile/profile.module.scss";

export default function ProfilePage() {
  // usr profile custom hook
  const { activeTab, setActiveTab, user } = useUserProfile();

  return (
    <div className={styles.profileContainer}>
      <motion.div
        className={styles.profileHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.avatarContainer}>
          <UserCircle className={styles.avatar} />
          <div className={styles.userInfo}>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
      </motion.div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "personal" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            <User size={20} />
            <span>البيانات الشخصية</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "password" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            <Lock size={20} />
            <span>تغيير كلمة المرور</span>
          </button>
        </div>

        <div className={styles.tabContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.formContainer}
            >
              {activeTab === "personal" ? <PersonalTap /> : <PasswordsTap />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
