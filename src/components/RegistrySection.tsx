import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegistrySection = () => (
  <section className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="content-left"
    >
      <p className="overline mb-6">Registry</p>
      <p className="body-text mb-6">
        Your love and support mean everything to us. Many of you are traveling
        from near and far to celebrate with us in Charleston, and your presence
        is truly the greatest gift. For those who have asked, we've created a
        small registry for our home together and a fund for our honeymoon
        adventures. However, please know that your attendance is all we wish for.
      </p>
      <Link to="/registry" className="btn-ghost">
        View our registry →
      </Link>
    </motion.div>
  </section>
);

export default RegistrySection;
