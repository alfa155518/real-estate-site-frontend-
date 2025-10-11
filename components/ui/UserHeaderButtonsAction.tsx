import Link from "next/link";
import { Search, LogIn, LogOut, User, Loader2 } from "lucide-react";
import Image from "next/image";
import useUserHeader from "@/hooks/useUserHeader";
import styles from "@/sass/layout/header.module.scss";
export default function UserHeaderButtonsAction() {
  // use user header custom hook
  const {
    searchResults,
    showResults,
    setShowResults,
    searchRef,
    token,
    isLoading,
    register,
    handleSubmit,
    handleSearch,
    handleSearchSubmit,
    handleResultClick,
    setIsMobileMenuOpen,
    handleLogout,
  } = useUserHeader();

  return (
    <>
      <div className={styles.searchContainer} ref={searchRef}>
        <form
          onSubmit={handleSubmit(handleSearchSubmit)}
          className={styles.searchForm}
        >
          <input
            type="text"
            autoComplete="search"
            placeholder="ابحث عن شقة او فيلا ..."
            {...register("search")}
            aria-label="Search properties"
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchResults?.length > 0 && setShowResults(true)}
          />
          <button type="submit" aria-label="Search">
            <Search size={18} />
          </button>
        </form>
        {showResults && searchResults?.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.slice(0, 5).map((property) => (
              <div
                key={property.id}
                className={styles.resultItem}
                onClick={() => handleResultClick(property.id, property.slug)}
              >
                <div className={styles.resultImage}>
                  <Image
                    src={
                      property.images[0]?.image_url || "/images/placeholder.jpg"
                    }
                    alt={property.title}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.resultInfo}>
                  <h4>{property.title}</h4>
                  <p>{property.location.city}</p>
                  <span>{property.price.toLocaleString()} ج.م</span>
                </div>
              </div>
            ))}
            {searchResults?.length > 5 && (
              <div className={styles.viewAll}>
                <Link
                  href={`/search?q=${encodeURIComponent(
                    searchResults[0].title.split(" ")[0]
                  )}`}
                >
                  عرض جميع النتائج ({searchResults?.length})
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* auth buttons */}
      <div className={styles.authButtons}>
        {token ? (
          <>
            <Link
              href="/profile"
              className={styles.profileButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={16} />
              <span>الملف الشخصي</span>
            </Link>
            <button
              onClick={() => handleLogout()}
              className={styles.logoutButton}
              aria-label="تسجيل الخروج"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>تسجيل الخروج جاري</span>
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  <span>تسجيل الخروج</span>
                </>
              )}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className={styles.loginButton}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LogIn size={18} />
            <span>تسجيل الدخول</span>
          </Link>
        )}
      </div>
    </>
  );
}
