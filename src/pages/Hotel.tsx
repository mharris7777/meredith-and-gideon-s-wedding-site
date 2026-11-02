import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const Hotel = () => (
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
        <p className="overline mb-4">Accommodations</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground leading-tight mb-6">
          The Aurora Grand Hotel
        </h1>
        <p className="body-text">
          892 Meeting Street, Charleston, SC 29401
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="content-left"
      >
        <div className="mb-16 md:mb-20">
          <p className="overline mb-4">Group Rate Details</p>
          <p className="body-text mb-6">
            We've arranged a special group rate of <span className="font-medium">$189 per night</span> for
            the Meredith & Gideon wedding. This rate is available for stays between June 16–18, 2025. Simply
            mention the <span className="font-medium">Meredith & Gideon Wedding Block</span> when
            calling reservations, or use code <span className="font-medium">MEREDITHGIDEON25</span> online.

          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif">
            Please book by May 15, 2025 to guarantee the group rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
          <div>
            <p className="overline mb-3">Check-In</p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-1">Monday, June 16, 2025</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">3:00 PM</p>
          </div>
          <div>
            <p className="overline mb-3">Check-Out</p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-1">Wednesday, June 18, 2025</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">11:00 AM</p>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <p className="overline mb-4">Hotel Amenities</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">
            {[
              "Complimentary breakfast buffet",
              "Outdoor heated pool & spa",
              "Fitness center & yoga studio",
              "Valet parking ($25/night)",
              "Concierge service",
              "Pet-friendly rooms available",
              "Rooftop bar with harbor views",
              "Complimentary Wi-Fi",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-muted-foreground mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-16 md:mb-20">
          <p className="overline mb-4">Getting There</p>
          <p className="body-text mb-4">
            The Aurora Grand is located in Charleston's Historic District, just 20 minutes from
            Charleston International Airport (CHS). Complimentary shuttle service is available
            from the airport — call the front desk upon landing to arrange pickup.
          </p>
          <p className="body-text">
            The hotel is a 10-minute drive from Riverside Botanical Gardens (ceremony venue) and
            a 5-minute walk to The Charleston Grand Ballroom (reception venue).
          </p>
        </div>

        <div className="text-center">
          <a href="tel:+18435551234" className="btn-primary mb-4 mr-4">
            Call to Book: (843) 555-1234
          </a>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  </div>
);

export default Hotel;
