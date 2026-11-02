import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TravelSection = () => (
  <section className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="content-left"
    >
      <p className="overline mb-6">Travel & Accommodations</p>
      <p className="body-text mb-6">
        We've reserved a block of rooms at The Aurora Grand Hotel in the Historic
        District. Simply mention the Cooper wedding when booking your reservation
        to receive our group rate. Rooms are available from June 16–18, 2025.
      </p>
      <Link to="/hotel" className="btn-ghost">
        The Aurora Grand Hotel →
      </Link>
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mt-3 font-serif">
        892 Meeting Street, Charleston, SC 29401
      </p>
    </motion.div>
  </section>
);

export default TravelSection;
