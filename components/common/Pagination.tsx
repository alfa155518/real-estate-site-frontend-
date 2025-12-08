import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useCallback, memo } from "react";
import styles from "@/sass/components/common/Pagination.module.scss";
import { PaginationMeta } from "@/types/pagination";

const Pagination = ({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange?: (page: number) => void;
}) => {
  const handlePageClick = useCallback((page: number) => {
    if (page < 1 || page > meta.last_page) return;
    onPageChange?.(page);
  }, [meta.last_page, onPageChange]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 3;
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
          <motion.span
            key="start-ellipsis"
            className={styles.ellipsis}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            ...
          </motion.span>
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
          <motion.span
            key="end-ellipsis"
            className={styles.ellipsis}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            ...
          </motion.span>
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
  }, [meta.current_page, meta.last_page, handlePageClick]);

  if (meta.last_page <= 1) return null;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        عرض {meta.from || 0} - {meta.to || 0} من أصل {meta.total} عقار
      </div>

      <div className={styles.pagination}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`${styles.navButton} ${meta.current_page === 1 ? styles.disabled : ""
            }`}
          onClick={() => handlePageClick(meta.current_page - 1)}
          disabled={meta.current_page === 1}
          aria-label="الصفحة السابقة"
        >
          السابق
        </motion.button>

        <div className={styles.pages}>
          <AnimatePresence mode="popLayout">
            {pageNumbers}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`${styles.navButton} ${meta.current_page === meta.last_page ? styles.disabled : ""
            }`}
          onClick={() => handlePageClick(meta.current_page + 1)}
          disabled={meta.current_page === meta.last_page}
          aria-label="الصفحة التالية"
        >
          التالي
        </motion.button>
      </div>
    </div>
  );
};

const PageNumber = memo(({
  number,
  isActive,
  onClick,
}: {
  number: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
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
));

PageNumber.displayName = "PageNumber";

export default Pagination;