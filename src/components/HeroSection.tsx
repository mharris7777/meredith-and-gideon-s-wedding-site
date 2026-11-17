import "./HeroSection.css";
import { motion } from "framer-motion";
import DateSection from "@/components/DateSection";
import { heroPhoto } from "@/components/engagementPhotos";
import { usePhotoLightbox, type Photo } from "@/components/PhotoLightbox";

const photos: Photo[] = [
  heroPhoto,
];

const HeroSection = () => {
  const lightbox = usePhotoLightbox(photos);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <button
          type="button"
          onClick={() => lightbox.open(0)}
          aria-label={`View larger photo: ${photos[0].alt}`}
          className="cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
        >
          <div className="polaroid-frame inline-block mb-14 md:mb-20">
            <img
              src={heroPhoto.src}
              srcSet={heroPhoto.srcSet}
              sizes="(min-width: 768px) min(63vh, 1000px), 80vw"
              width={960}
              height={640}
              fetchPriority="high"
              decoding="async"
              alt={photos[0].alt}
              className="w-full h-auto object-cover"
              style={{ maxWidth: "min(74vh, 86vw, 1400px)" }}
            />
          </div>
        </button>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="text-4xl md:text-6xl lg:text-8xl homepage-couple-name text-foreground text-center leading-snug mb-4"
        >
          Meredith & Gideon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif text-primary text-center"
        >
          ♡
        </motion.p>
        <DateSection />
      </motion.div>
      {lightbox.element}
    </section>
  );
};

export default HeroSection;
