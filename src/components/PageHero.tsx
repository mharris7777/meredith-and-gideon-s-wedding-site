import { motion } from "framer-motion";
import heroImage from "@/assets/meredith-gideon-021.jpg.asset.json";
import { usePhotoLightbox, type Photo } from "@/components/PhotoLightbox";

const photos: Photo[] = [
  { src: heroImage.url, alt: "Meredith and Gideon smiling at each other on a garden bench" },
];

const PageHero = () => {
  const lightbox = usePhotoLightbox(photos);

  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 flex flex-col items-center px-6">
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
              style={{ maxWidth: "min(80vh, 88vw, 1500px)" }}
            />
          </div>
        </button>
      </motion.div>
      {lightbox.element}
    </section>
  );
};

export default PageHero;
