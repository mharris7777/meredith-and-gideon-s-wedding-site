import { motion } from "framer-motion";

const DateSection = () => (
  <section className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="content-left"
    >
      <p className="body-text">
        MEREDITH + GIDEON
      </p>
      <p className="body-text mt-8">
        DEMAREST, NEW JERSEY
      </p>
      <p className="mt-10 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif">
        — SEPTEMBER 4TH, 2027
      </p>
    </motion.div>
  </section>
);

export default DateSection;
