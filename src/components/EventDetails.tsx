import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const events = [
  {
    title: "Ceremony",
    venue: "Riverside Botanical Gardens",
    address: "485 Magnolia Drive, Charleston, SC 29401",
    time: "5:30 PM – 6:15 PM",
  },
  {
    title: "Reception",
    venue: "The Charleston Grand Ballroom",
    address: "723 Harbor View Avenue, Charleston, SC 29401",
    time: "7:00 PM – 11:30 PM",
  },
];

const EventDetails = () => (
  <section className="section-padding">
    <div className="content-left">
      {events.map((event, index) => (
        <motion.div
          key={event.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: true }}
          className={index === 0 ? "mb-16 md:mb-20" : ""}
        >
          <p className="overline mb-4">{event.title}</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-2">{event.venue}</p>
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground mb-1">{event.address}</p>
          <p className="text-lg md:text-xl lg:text-2xl font-serif text-muted-foreground">{event.time}</p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-20"
      >
        <Link to="/rsvp" className="btn-ghost">
          Respond to our invitation →
        </Link>
      </motion.div>
    </div>
  </section>
);

export default EventDetails;
