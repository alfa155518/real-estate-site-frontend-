"use client";
import { useEffect } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "@/sass/pages/home/hero.module.scss";

import useSlidersStore from "@/store/SlidersStore";

export default function Hero() {
  const { handleGetSlider, sliders, isLoading, defaultSlide } =
    useSlidersStore();

  useEffect(() => {
    async function fetchData() {
      await handleGetSlider(1);
    }
    fetchData();
  }, [handleGetSlider]);

  return (
    <section>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        modules={[Autoplay, Pagination]}
        loop={true}
        className={styles.heroSlides}
      >
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
                width={1920}
                height={1080}
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
