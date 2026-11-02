import { motion } from "framer-motion";
import photo1 from "@/assets/photo-grid-1.jpg";
import photo2 from "@/assets/photo-grid-2.jpg";
import photo3 from "@/assets/photo-grid-3.jpg";

const photos = [
  { src: photo1, alt: "Couple laughing at outdoor café" },
  { src: photo2, alt: "Beach sunset silhouettes" },
  { src: photo3, alt: "Cozy fireplace portrait" },
];

const PhotoGrid = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="aspect-[4/5] overflow-hidden"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  </section>
);

export default PhotoGrid;
