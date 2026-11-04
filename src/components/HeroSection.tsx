import { motion } from "framer-motion";
import heroImage from "@/assets/meredith-gideon-028.jpg.asset.json";
import { usePhotoLightbox, type Photo } from "@/components/PhotoLightbox";

const photos: Photo[] = [
  { src: heroImage.url, alt: "Meredith and Gideon seated together overlooking the park" },
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
              src={heroImage.url}
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
          className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground text-center leading-snug"
        >
          MEREDITH & GIDEON
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="body-text">
            ALPINE COUNTRY CLUB
          </p>
          <p className="body-text">
            DEMAREST, NEW JERSEY
          </p>
          <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif">
            — SEPTEMBER 4TH, 2027
          </p>
        </motion.div>
      </motion.div>
      {lightbox.element}
    </section>
  );
};

export default HeroSection;
