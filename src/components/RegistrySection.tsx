import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegistrySection = () => (
  <section className="section-padding bg-muted">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="content-left"
    >
      <p className="overline mb-6">Registry</p>
      <p className="body-text mb-6">
        We're registered at Bloomingdale's, with a honeymoon fund for our
        two weeks in Japan and Vietnam.
      </p>
      <Link to="/registry" className="btn-ghost">
        View our registry →
      </Link>
    </motion.div>
  </section>
);

export default RegistrySection;
