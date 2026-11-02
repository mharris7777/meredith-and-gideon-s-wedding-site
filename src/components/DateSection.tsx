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
        Join us for an evening of celebration as we begin our journey together.
        The festivities will commence with an intimate garden ceremony at sunset,
        followed by a reception filled with dinner, dancing, and joy. We kindly
        request semi-formal attire—garden party chic is encouraged.
      </p>
      <p className="body-text mt-8">
        We can't wait to share this moment with the people who mean the most to us.
      </p>
      <p className="mt-10 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif">
        — June 17, 2025
      </p>
    </motion.div>
  </section>
);

export default DateSection;
