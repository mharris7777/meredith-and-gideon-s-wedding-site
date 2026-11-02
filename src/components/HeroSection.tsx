import { motion } from "framer-motion";
import heroImage from "@/assets/meredith-gideon-028.jpg.asset.json";

const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="polaroid-frame inline-block mb-14 md:mb-20">
        <img
          src={heroImage.url}
          alt="Meredith and Gideon seated together overlooking the park"

          className="w-full h-auto object-cover"
          style={{ maxWidth: "calc(min(50.5vh, 50.5vw, 5000px))" }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.0 }}
        className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground text-center leading-snug mb-4"
      >
        We're Getting Married
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground text-center"
      >
        Meredith & Gideon
      </motion.p>
    </motion.div>
  </section>
);

export default HeroSection;
