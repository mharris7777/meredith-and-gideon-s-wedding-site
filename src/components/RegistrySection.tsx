import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const REGISTRY_URL =
  "https://www.bloomingdales.com/registry/Meredith-Harris-Gideon-Abramowitz/1631089";

const RegistrySection = () => (
  <section aria-labelledby="registry-heading" className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="content-left"
    >
      <h2 id="registry-heading" className="overline mb-6">
        Registry
      </h2>
      <p className="body-text mb-6">
        We're registered at Bloomingdale's, with a honeymoon fund for our two weeks in Japan
        and Vietnam.
      </p>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <Link to="/registry" className="btn-ghost">
          View our registry{" "}
          <span aria-hidden="true">→</span>
        </Link>
        <a
          href={REGISTRY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm md:text-base tracking-wide break-all"
        >
          bloomingdales.com/registry/Meredith-Harris-Gideon-Abramowitz/1631089
        </a>
      </div>
    </motion.div>
  </section>
);

export default RegistrySection;
