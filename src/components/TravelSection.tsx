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
        We've reserved a block of rooms at the Teaneck Marriott at Glenpointe. Rooms are available from September 3–5, 2027.
      </p>
      <Link to="/hotel" className="btn-ghost">
        Teaneck Marriott at Glenpointe →
      </Link>
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mt-3 font-serif">
        100 Frank W. Burr Blvd, Teaneck, NJ 07666
      </p>
    </motion.div>
  </section>
);

export default TravelSection;
