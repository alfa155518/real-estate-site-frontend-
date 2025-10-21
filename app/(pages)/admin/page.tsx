"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  DollarSign,
  Eye,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Heart,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import styles from "@/sass/pages/adminDashboard.module.scss";

// import LatestPropertiesImage1 from "/images/data/apartment-for-rent-in-al-rehab-1.webp";
// import LatestPropertiesImage2 from "/images/data/apartment-for-rent-in-al-rehab-2.webp";
// import LatestPropertiesImage3 from "/images/data/apartment-for-rent-in-el-manial-1.webp";
// import LatestPropertiesImage4 from "/images/data/apartment-for-rent-in-el-manial-2.webp";

// import TopPropertiesImage1 from "/images/data/apartment-for-rent-in-al-rehab-1.webp";
// import TopPropertiesImage2 from "/images/data/apartment-for-rent-in-al-rehab-2.webp";
// import TopPropertiesImage3 from "/images/data/apartment-for-rent-in-el-manial-1.webp";
// import TopPropertiesImage4 from "/images/data/apartment-for-rent-in-el-manial-2.webp";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const stats = [
  {
    id: 1,
    label: "إجمالي العقارات",
    value: "1,234",
    change: "+12.5%",
    positive: true,
    icon: Building2,
    color: "blue",
  },
  {
    id: 2,
    label: "المستخدمين النشطين",
    value: "856",
    change: "+8.2%",
    positive: true,
    icon: Users,
    color: "green",
  },
  {
    id: 3,
    label: "إجمالي الإيرادات",
    value: "$45,678",
    change: "+23.1%",
    positive: true,
    icon: DollarSign,
    color: "orange",
  },
  {
    id: 4,
    label: "مشاهدات الصفحة",
    value: "23,456",
    change: "-3.4%",
    positive: false,
    icon: Eye,
    color: "red",
  },
];

const latestProperties = [
  {
    id: 1,
    title: "شقة فاخرة في الرياض",
    price: "$350,000",
    location: "الرياض، حي الملقا",
    addedDate: "منذ 5 دقائق",
    status: "للبيع",
    image: "/images/data/apartment-for-rent-in-al-rehab-1.webp",
  },
  {
    id: 2,
    title: "فيلا عصرية في جدة",
    price: "$520,000",
    location: "جدة، حي الروضة",
    addedDate: "منذ 15 دقيقة",
    status: "للبيع",
    image: "/images/data/apartment-for-rent-in-al-rehab-2.webp",
  },
  {
    id: 3,
    title: "شقة للإيجار في الدمام",
    price: "$1,200/شهر",
    location: "الدمام، حي الفيصلية",
    addedDate: "منذ 30 دقيقة",
    status: "للإيجار",
    image: "/images/data/apartment-for-rent-in-al-rehab-1.webp",
  },
  {
    id: 4,
    title: "منزل واسع في الخبر",
    price: "$420,000",
    location: "الخبر، حي العقربية",
    addedDate: "منذ ساعة",
    status: "للبيع",
    image: "/images/data/apartment-for-rent-in-al-rehab-2.webp",
  },
];

const topProperties = [
  {
    id: 1,
    title: "فيلا فاخرة في الرياض",
    price: "$450,000",
    views: 1234,
    likes: 89,
    image: "/images/data/apartment-for-rent-in-al-rehab-1.webp",
  },
  {
    id: 2,
    title: "شقة عصرية في جدة",
    price: "$280,000",
    views: 987,
    likes: 67,
    image: "/images/data/apartment-for-rent-in-al-rehab-2.webp",
  },
  {
    id: 3,
    title: "منزل واسع في الدمام",
    price: "$320,000",
    views: 856,
    likes: 54,
    image: "/images/data/apartment-for-rent-in-al-rehab-1.webp",
  },
  {
    id: 4,
    title: "شقة بنتهاوس في الخبر",
    price: "$550,000",
    views: 743,
    likes: 43,
    image: "/images/data/apartment-for-rent-in-al-rehab-2.webp",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

// Chart Data
const chartDataSets = {
  daily: {
    labels: [
      "السبت",
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
    ],
    datasets: [
      {
        label: "المبيعات",
        data: [3, 5, 4, 7, 6, 8, 5],
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الإيجارات",
        data: [2, 3, 2, 4, 3, 5, 4],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  weekly: {
    labels: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"],
    datasets: [
      {
        label: "المبيعات",
        data: [18, 25, 22, 30],
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الإيجارات",
        data: [12, 15, 14, 18],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  monthly: {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"],
    datasets: [
      {
        label: "المبيعات",
        data: [12, 19, 15, 25, 22, 30, 28],
        borderColor: "#1e3a8a",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "الإيجارات",
        data: [8, 12, 10, 15, 14, 18, 20],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
};

const propertyTypesData = {
  labels: ["شقق", "فلل", "منازل", "أراضي", "تجاري"],
  datasets: [
    {
      data: [45, 32, 28, 15, 12],
      backgroundColor: ["#1e3a8a", "#3b82f6", "#f59e0b", "#22c55d", "#ef4444"],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        font: {
          family: "inherit",
          size: 12,
        },
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        font: {
          family: "inherit",
          size: 12,
        },
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      cornerRadius: 8,
    },
  },
};

export default function AdminDashboard() {
  const [chartFilter, setChartFilter] = useState<
    "daily" | "weekly" | "monthly"
  >("monthly");
  const salesChartData = chartDataSets[chartFilter];

  return (
    <div className={styles.dashboard}>
      {/* Stats Grid */}
      <motion.div
        className={styles.statsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className={`${styles.statCard} ${styles[stat.color]}`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.statHeader}>
              <motion.div
                className={styles.statIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon size={24} />
              </motion.div>
              <div
                className={`${styles.statChange} ${
                  stat.positive ? styles.positive : styles.negative
                }`}
              >
                {stat.positive ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                {stat.change}
              </div>
            </div>
            <div className={styles.statContent}>
              <motion.div
                className={styles.statValue}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2,
                }}
              >
                {stat.value}
              </motion.div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className={styles.chartsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>إحصائيات المبيعات</h2>
            <div className={styles.chartActions}>
              <button
                className={chartFilter === "monthly" ? styles.active : ""}
                onClick={() => setChartFilter("monthly")}
              >
                شهري
              </button>
              <button
                className={chartFilter === "weekly" ? styles.active : ""}
                onClick={() => setChartFilter("weekly")}
              >
                أسبوعي
              </button>
              <button
                className={chartFilter === "daily" ? styles.active : ""}
                onClick={() => setChartFilter("daily")}
              >
                يومي
              </button>
            </div>
          </div>
          <div className={styles.chartContent}>
            <Line data={salesChartData} options={chartOptions} />
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>توزيع العقارات</h2>
          </div>
          <div className={styles.chartContent}>
            <Doughnut data={propertyTypesData} options={doughnutOptions} />
          </div>
        </div>
      </motion.div>

      {/* Tables Section */}
      <motion.div
        className={styles.tablesSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Latest Added Properties */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2>أحدث العقارات المضافة</h2>
            <a href="/admin/properties">
              عرض الكل <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.propertyList}>
            {latestProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className={styles.propertyItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className={styles.propertyImage}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="80px"
                  />
                </motion.div>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyTitle}>{property.title}</div>
                  <div className={styles.propertyMeta}>
                    <span>{property.location}</span>
                    <span>•</span>
                    <span>{property.addedDate}</span>
                  </div>
                </div>
                <div className={styles.propertyPrice}>{property.price}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Properties */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2>العقارات الأكثر مشاهدة</h2>
            <a href="/admin/properties">
              عرض الكل <ArrowRight size={16} />
            </a>
          </div>
          <div className={styles.propertyList}>
            {topProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className={styles.propertyItem}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <motion.div
                  className={styles.propertyImage}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="80px"
                  />
                </motion.div>
                <div className={styles.propertyInfo}>
                  <div className={styles.propertyTitle}>{property.title}</div>
                  <div className={styles.propertyMeta}>
                    <span>
                      <Eye size={20} /> {property.views}
                    </span>
                    <span>
                      <Heart size={20} color="#ef4444" /> {property.likes}
                    </span>
                  </div>
                </div>
                <div className={styles.propertyPrice}>{property.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
