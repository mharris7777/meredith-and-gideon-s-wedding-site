import { motion } from "framer-motion";

const DateSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 1.6 }}
    className="mt-8 md:mt-10 space-y-3 text-center font-serif text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide text-foreground"
  >
    <p>ALPINE COUNTRY CLUB</p>
    <p>DEMAREST, NEW JERSEY</p>
    <p><time dateTime="2027-09-04">SEPTEMBER 4TH, 2027</time></p>
  </motion.div>
);

export default DateSection;
