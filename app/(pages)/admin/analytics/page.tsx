"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  DollarSign,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import styles from "@/sass/pages/adminAnalytics.module.scss";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const metrics = [
  {
    id: 1,
    label: "إجمالي الإيرادات",
    value: "2,450,000",
    currency: "ر.س",
    change: "+15.3%",
    positive: true,
    icon: DollarSign,
    color: "revenue",
    chartData: [40, 60, 45, 70, 55, 80, 75],
  },
  {
    id: 2,
    label: "مشاهدات الصفحة",
    value: "125,430",
    change: "+8.2%",
    positive: true,
    icon: Eye,
    color: "views",
    chartData: [30, 50, 40, 65, 50, 70, 85],
  },
  {
    id: 3,
    label: "معدل التحويل",
    value: "3.24%",
    change: "-2.1%",
    positive: false,
    icon: TrendingUp,
    color: "conversion",
    chartData: [60, 55, 50, 45, 40, 35, 30],
  },
  {
    id: 4,
    label: "معدل التفاعل",
    value: "68.5%",
    change: "+12.4%",
    positive: true,
    icon: Users,
    color: "engagement",
    chartData: [35, 45, 55, 60, 70, 75, 80],
  },
];

const topProperties = [
  {
    id: 1,
    name: "فيلا فاخرة في حي الياسمين",
    location: "الرياض",
    views: 12543,
    inquiries: 234,
    conversionRate: 85,
    revenue: "2,500,000",
    change: "+12.5%",
    positive: true,
  },
  {
    id: 2,
    name: "شقة عصرية في برج الفيصلية",
    location: "الرياض",
    views: 9876,
    inquiries: 187,
    conversionRate: 72,
    revenue: "850,000",
    change: "+8.3%",
    positive: true,
  },
  {
    id: 3,
    name: "منزل واسع في الدمام",
    location: "الدمام",
    views: 8432,
    inquiries: 156,
    conversionRate: 68,
    revenue: "1,200,000",
    change: "-3.2%",
    positive: false,
  },
  {
    id: 4,
    name: "شقة بنتهاوس في الخبر",
    location: "الخبر",
    views: 7654,
    inquiries: 143,
    conversionRate: 65,
    revenue: "950,000",
    change: "+5.7%",
    positive: true,
  },
  {
    id: 5,
    name: "فيلا مع مسبح في جدة",
    location: "جدة",
    views: 6789,
    inquiries: 128,
    conversionRate: 58,
    revenue: "1,800,000",
    change: "+9.1%",
    positive: true,
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

// Revenue Growth Chart Data
const getChartData = (period: string) => {
  switch (period) {
    case "daily":
      return {
        labels: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toLocaleDateString("ar-SA", { weekday: "short" });
        }),
        datasets: [
          {
            label: "الإيرادات اليومية",
            data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      };
    case "weekly":
      return {
        labels: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"],
        datasets: [
          {
            label: "الإيرادات الأسبوعية",
            data: [120000, 190000, 150000, 250000],
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      };
    case "monthly":
    default:
      return {
        labels: [
          "يناير",
          "فبراير",
          "مارس",
          "أبريل",
          "مايو",
          "يونيو",
          "يوليو",
          "أغسطس",
          "سبتمبر",
          "أكتوبر",
          "نوفمبر",
          "ديسمبر",
        ].slice(0, new Date().getMonth() + 1),
        datasets: [
          {
            label: "الإيرادات الشهرية",
            data: [
              65000, 59000, 80000, 81000, 56000, 55000, 40000, 75000, 82000,
              78000, 85000, 90000,
            ].slice(0, new Date().getMonth() + 1),
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      };
  }
};
// Property Types Distribution
const propertyDistributionData = {
  labels: ["شقق", "فلل", "منازل", "أراضي", "تجاري"],
  datasets: [
    {
      data: [45, 32, 28, 15, 12],
      backgroundColor: ["#1e3a8a", "#3b82f6", "#f59e0b", "#22c55d", "#ef4444"],
      borderWidth: 0,
    },
  ],
};

// Monthly Comparison Bar Chart
const monthlyComparisonData = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
  datasets: [
    {
      label: "المبيعات",
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: "#1e3a8a",
    },
    {
      label: "الإيجارات",
      data: [8, 12, 10, 15, 14, 18],
      backgroundColor: "#3b82f6",
    },
  ],
};

const lineChartOptions = {
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

const pieChartOptions = {
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

const barChartOptions = {
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

export default function AnalyticsPage() {
  const [chartFilter, setChartFilter] = useState<
    "monthly" | "weekly" | "daily"
  >("monthly");
  return (
    <div className={styles.analyticsPage}>
      {/* Page Header */}
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.headerLeft}>
          <h1>التحليلات والإحصائيات</h1>
          <p>تتبع أداء العقارات والمبيعات والمستخدمين</p>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        className={styles.metricsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            className={`${styles.metricCard} ${styles[metric.color]}`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <motion.div
                className={styles.metricIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <metric.icon size={22} />
              </motion.div>
            </div>

            <motion.div
              className={styles.metricValue}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              {metric.value}
              {metric.currency && (
                <span style={{ fontSize: "1rem", marginRight: "0.5rem" }}>
                  {metric.currency}
                </span>
              )}
            </motion.div>

            <div
              className={`${styles.metricChange} ${metric.positive ? styles.positive : styles.negative
                }`}
            >
              {metric.positive ? (
                <ArrowUp className={styles.changeIcon} size={25} />
              ) : (
                <ArrowDown className={styles.changeIcon} size={24} />
              )}
              {metric.change} من الشهر الماضي
            </div>

            <div className={styles.metricChart}>
              {metric.chartData.map((height, index) => (
                <motion.div
                  key={index}
                  className={styles.chartBar}
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                />
              ))}
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
            <h2>نمو الإيرادات</h2>
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
            <Line data={getChartData(chartFilter)} options={lineChartOptions} />
          </div>
        </div>

        <div className={`${styles.chartCard} ${styles.pieChartCard}`}>
          <div className={styles.chartHeader}>
            <h3>توزيع أنواع العقارات</h3>
          </div>
          <div className={styles.chartContent}>
            <Pie data={propertyDistributionData} options={pieChartOptions} />
          </div>
        </div>
      </motion.div>

      {/* Additional Bar Chart */}
      <motion.div
        className={styles.chartsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ gridTemplateColumns: "1fr", marginTop: "1.5rem" }}
      >
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>مقارنة شهرية - المبيعات والإيجارات</h3>
          </div>
          <div className={styles.chartContent}>
            <Bar data={monthlyComparisonData} options={barChartOptions} />
          </div>
        </div>
      </motion.div>

      {/* Top Properties Table */}
      <motion.div
        className={styles.dataTable}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className={styles.tableHeader}>
          <h3>العقارات الأكثر أداءً</h3>
        </div>

        <div className={styles.tableContent}>
          <table>
            <thead>
              <tr>
                <th>العقار</th>
                <th>المشاهدات</th>
                <th>الاستفسارات</th>
                <th>معدل التحويل</th>
                <th>الإيرادات</th>
                <th>التغيير</th>
              </tr>
            </thead>
            <tbody>
              {topProperties.map((property, index) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <td data-label="العقار">
                    <div className={styles.propertyName}>{property.name}</div>
                    <div className={styles.propertyLocation}>
                      {property.location}
                    </div>
                  </td>
                  <td data-label="المشاهدات">
                    <span className={styles.metric}>
                      {property.views.toLocaleString("ar-SA")}
                    </span>
                  </td>
                  <td data-label="الاستفسارات">
                    <span className={styles.metric}>
                      {property.inquiries.toLocaleString("ar-SA")}
                    </span>
                  </td>
                  <td data-label="معدل التحويل">
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${property.conversionRate}%` }}
                        transition={{
                          delay: 0.8 + index * 0.05,
                          duration: 0.5,
                        }}
                      />
                    </div>
                    <div style={{ marginTop: "0.5rem", fontSize: "1.3rem" }}>
                      {property.conversionRate}%
                    </div>
                  </td>
                  <td data-label="الإيرادات">
                    <strong>{property.revenue} ر.س</strong>
                  </td>
                  <td data-label="التغيير">
                    <div
                      className={`${styles.metric} ${property.positive ? styles.positive : styles.negative
                        }`}
                    >
                      {property.positive ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      {property.change}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
