import { motion } from "framer-motion";
import photo1 from "@/assets/meredith-gideon-020.jpg.asset.json";
import photo2 from "@/assets/meredith-gideon-017.jpg.asset.json";
import photo3 from "@/assets/meredith-gideon-006.jpg.asset.json";
import photo4 from "@/assets/meredith-gideon-001.jpg.asset.json";

const photos = [
  { src: photo1.url, alt: "Meredith and Gideon embracing on a garden bench" },
  { src: photo2.url, alt: "Meredith and Gideon surrounded by garden flowers" },
  { src: photo3.url, alt: "Meredith and Gideon walking together in black and white" },
  { src: photo4.url, alt: "Meredith and Gideon beneath autumn leaves" },
];

const PhotoGrid = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
