import { motion } from "framer-motion";
import heroImage from "@/assets/meredith-gideon-021.jpg.asset.json";

const PageHero = () => (
  <section className="pt-24 md:pt-32 pb-16 md:pb-24 flex flex-col items-center px-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="polaroid-frame inline-block mb-14 md:mb-20">
        <img
          src={heroImage.url}
          alt="Meredith and Gideon smiling at each other on a garden bench"
          className="w-full h-auto object-cover"
          style={{ maxWidth: "calc(min(50.5vh, 50.5vw, 5000px))" }}
        />
      </div>
    </motion.div>
  </section>
);

export default PageHero;
