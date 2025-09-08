"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Autoplay,Pagination } from 'swiper/modules';
import styles from '@/sass/pages/home/hero.module.scss';
import Image from 'next/image';

const images:string[] = [
    "/images/home/hero-slides/slide-1.webp",
    "/images/home/hero-slides/slide-2.webp",
    "/images/home/hero-slides/slide-3.webp",
    "/images/home/hero-slides/slide-4.webp",
    "/images/home/hero-slides/slide-5.webp",
    "/images/home/hero-slides/slide-6.webp",
    "/images/home/hero-slides/slide-7.webp",
    "/images/home/hero-slides/slide-8.webp",
    "/images/home/hero-slides/slide-9.webp",
]

export default function Hero() {
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
        modules={[Autoplay,Pagination]}
        loop={true}

        className={styles.heroSlides}
      >
        {
            images.map((image:string , index:number) => (
                <SwiperSlide key={index}>
                    <Image src={image} alt={`slide-${index + 1}`} width={1920} height={1080} priority={index < 1} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </section>
  );
}
