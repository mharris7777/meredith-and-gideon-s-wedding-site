import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const REGISTRY_URL =
  "https://www.bloomingdales.com/registry/Meredith-Harris-Gideon-Abramowitz/1631089";

const categories = [
  {
    title: "Honeymoon Fund",
    blurb: "Two weeks together across Japan and Vietnam.",
    icon: "✈️",
  },
];

const Registry = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <PageHero />

    <section className="pb-16 md:pb-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="content-left mb-16"
      >
        <p className="overline mb-4">Registry</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground leading-tight mb-6">
          Our Wish List
        </h1>
        <p className="body-text">
          Your presence at our wedding is the greatest gift of all. For those who have
          asked, we're registered at Bloomingdale's.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="content-left mb-16 border border-foreground/20 px-8 py-10 md:px-12 md:py-14"
      >
        <p className="overline mb-5">Our Full Registry</p>
        <p className="body-text mb-8">
          Everything we've chosen lives on our Bloomingdale's registry, where you can see
          what's still available and have it delivered straight to us.
        </p>
        <a
          href={REGISTRY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          View Our Registry
        </a>
        <p className="mt-6 font-sans text-sm md:text-base tracking-wide break-all">
          <a
            href={REGISTRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity"
          >
          
          </a>
        </p>
      </motion.div>

      <div className="content-left mb-16">
        {categories.map((group) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-14"
          >
            <p className="overline mb-3">{group.icon} {group.title}</p>
            <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed">
              {group.blurb}
            </p>
            <a
              href="https://venmo.com/MeredithHarris"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-[6px] bg-[#008CFF] px-6 py-3 font-sans font-bold text-white no-underline"
            >
              Send a Gift via Venmo
            </a>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/" className="btn-outline">Back to Home</Link>
      </div>
    </section>
  </div>
);

export default Registry;
