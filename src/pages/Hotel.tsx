import "./Wallpaper.css";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const Hotel = () => (
  <div className="min-h-screen wallpaper-page wallpaper-hotel">
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
          The Teaneck Marriott at Glenpointe
        </h1>
        <p className="body-text">
          100 Frank W. Burr Blvd, Teaneck, NJ 07666
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
            We've arranged a special group rate for Meredith & Gideon's wedding.
            This rate is available for stays between September 3-5, 2027.{" "}
            <a
              href="https://book.passkey.com/event/51375930/owner/10758828/home?utm_campaign=302124129"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Book here
            </a>
            , or when calling reservations, ask for the Harris/Abramowitz Wedding Room Block.
          </p>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif">
            Please book by Tuesday, August 3, 2027 to guarantee the group rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
          <div>
            <p className="overline mb-3">Check-In</p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-1">
              Friday, September 3, 2027
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">
              3:00 PM
            </p>
          </div>

          <div>
            <p className="overline mb-3">Check-Out</p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-1">
              Sunday, September 5, 2027
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-muted-foreground">
              11:00 AM
            </p>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <p className="overline mb-4">Getting There</p>
          <p className="body-text mb-4">
            The Teaneck Marriott at Glenpointe is located 20 minutes from
            Newark International Airport (EWR).
          </p>
          <p className="body-text">
            The hotel is a 20-minute drive from Alpine Country Club (ceremony venue).
            Shuttle services will be provided to and from the venue.
          </p>
        </div>

        <div className="text-center">
          <a href="tel:(201) 836-0600" className="btn-primary mb-4 mr-4">
            Call to Book: (201) 836-0600
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
