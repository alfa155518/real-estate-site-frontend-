import { motion, AnimatePresence } from "framer-motion";
import styles from "@/sass/components/common/Pagination.module.scss";
import { PaginationMeta } from "@/types/pagination";

const Pagination = ({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange?: (page: number) => void;
}) => {
  const handlePageClick = (page: number) => {
    if (page < 1 || page > meta.last_page) return;
    if (onPageChange) onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Reduced from 5 to 3 for better mobile view
    let startPage = Math.max(
      1,
      meta.current_page - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(meta.last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <PageNumber
          key={1}
          number={1}
          isActive={1 === meta.current_page}
          onClick={() => handlePageClick(1)}
        />
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          number={i}
          isActive={i === meta.current_page}
          onClick={() => handlePageClick(i)}
        />
      );
    }

    // Last page
    if (endPage < meta.last_page) {
      if (endPage < meta.last_page - 1) {
        pages.push(
          <span key="end-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <PageNumber
          key={meta.last_page}
          number={meta.last_page}
          isActive={meta.last_page === meta.current_page}
          onClick={() => handlePageClick(meta.last_page)}
        />
      );
    }

    return pages;
  };

  if (meta.last_page <= 1) return null;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        عرض {meta.from || 0} - {meta.to || 0} من أصل {meta.total} عقار
      </div>

      <div className={styles.pagination}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`${styles.navButton} ${
            meta.current_page === 1 ? styles.disabled : ""
          }`}
          onClick={() => handlePageClick(meta.current_page - 1)}
          disabled={meta.current_page === 1}
        >
          السابق
        </motion.button>

        <div className={styles.pages}>
          <AnimatePresence>{renderPageNumbers()}</AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`${styles.navButton} ${
            meta.current_page === meta.last_page ? styles.disabled : ""
          }`}
          onClick={() => handlePageClick(meta.current_page + 1)}
          disabled={meta.current_page === meta.last_page}
        >
          التالي
        </motion.button>
      </div>
    </div>
  );
};

const PageNumber = ({
  number,
  isActive,
  onClick,
}: {
  number: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    key={number}
    className={`${styles.pageNumber} ${isActive ? styles.active : ""}`}
    onClick={onClick}
    whileHover={!isActive ? { scale: 1.1, backgroundColor: "#f3f4f6" } : {}}
    whileTap={!isActive ? { scale: 0.95 } : {}}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    aria-current={isActive ? "page" : undefined}
    aria-label={`الصفحة ${number}`}
  >
    {number}
  </motion.button>
);

export default Pagination;
