import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterRSVP = () => (
  <section className="py-48 md:py-64 lg:py-80 px-6">
    <div className="text-center max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground mb-10 md:mb-14 leading-snug"
      >
        Will You Celebrate With Us?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true }}
      >
        <Link to="/rsvp" className="btn-outline">
          RSVP
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FooterRSVP;
