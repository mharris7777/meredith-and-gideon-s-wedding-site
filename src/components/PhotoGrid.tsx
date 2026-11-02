import { motion } from "framer-motion";
import photo1 from "@/assets/meredith-gideon-020.jpg.asset.json";
import photo2 from "@/assets/meredith-gideon-017.jpg.asset.json";
import photo3 from "@/assets/meredith-gideon-006.jpg.asset.json";
import photo4 from "@/assets/meredith-gideon-001.jpg.asset.json";
import { usePhotoLightbox, type Photo } from "@/components/PhotoLightbox";

const photos: Photo[] = [
  { src: photo1.url, alt: "Meredith and Gideon embracing on a garden bench" },
  { src: photo2.url, alt: "Meredith and Gideon surrounded by garden flowers" },
  { src: photo3.url, alt: "Meredith and Gideon walking together in black and white" },
  { src: photo4.url, alt: "Meredith and Gideon beneath autumn leaves" },
];

const PhotoGrid = () => {
  const lightbox = usePhotoLightbox(photos);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="aspect-[4/5] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => lightbox.open(index)}
              aria-label={`View larger photo: ${photo.alt}`}
              className="w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </button>
          </motion.div>
        ))}
      </div>
      {lightbox.element}
    </section>
  );
};

export default PhotoGrid;
