"use client";

import "swiper/css";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import styles from "@/sass/pages/about-us/features-slider.module.scss";
import SectionName from "@/components/common/SectionName";
import { useEffect } from "react";
import useSlidersStore from "@/store/SlidersStore";

export default function FeaturesSlider() {
  const { handleGetSlider, sliders, isLoading, defaultSlide } =
    useSlidersStore();

  useEffect(() => {
    async function fetchData() {
      await handleGetSlider(3);
    }
    fetchData();
  }, [handleGetSlider]);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };
  return (
    <section className={styles.featuresSlider}>
      <SectionName
        title="
              اروع العقارات
              "
        subtitle="
              اكتشف اروع العقارات المتاحة الآن
              "
      />

      <Swiper
        pagination={pagination}
        dir="rtl"
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
      >
        <div className="swiper-pagination" />
        {isLoading || sliders.id === 0 ? (
          <SwiperSlide className={styles.swiperSlide}>
            <Image
              src={defaultSlide}
              alt={`default_slide`}
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 100vw,
            100vw"
              priority={true}
            />
          </SwiperSlide>
        ) : (
          sliders.images.map((image: string, index: number) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <Image
                src={image}
                alt={`slide-${index + 1}`}
                width={300}
                height={300}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 100vw,
                100vw"
                priority={index === 0}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
