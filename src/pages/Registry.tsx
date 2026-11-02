import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const registryItems = [
  { category: "Kitchen & Dining", items: ["Le Creuset Dutch Oven", "Vitamix Blender", "Dinnerware Set for 8", "Japanese Knife Set"], icon: "🍽️" },
  { category: "Home & Living", items: ["Casper Mattress", "Brooklinen Sheet Set", "West Elm Coffee Table", "Dyson Air Purifier"], icon: "🏡" },
  { category: "Honeymoon Fund", items: ["Sunset Sailing in Santorini", "Cooking Class in Tuscany", "Safari Adventure in Kenya", "Spa Day in Bali"], icon: "✈️" },
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
          asked, here are a few things we'd love as we build our home together.
        </p>
      </motion.div>

      <div className="content-left mb-16">
        {registryItems.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="mb-14 md:mb-18"
          >
            <p className="overline mb-3">{group.icon} {group.category}</p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="content-left mb-16"
      >
        <p className="overline mb-4">A Note From Us</p>
        <p className="body-text">
          We've been so fortunate to already have a home filled with love (and most of the
          basics!). If you'd like to contribute to our honeymoon fund, we'd be over the moon.
          We're dreaming of two weeks across Italy and Greece — your generosity would help
          make those adventures even more magical. But truly, just having you there on our
          big day means the world.
        </p>
      </motion.div>

      <div className="text-center">
        <Link to="/" className="btn-outline">Back to Home</Link>
      </div>
    </section>
  </div>
);

export default Registry;
