import { Link } from "react-router-dom";

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 md:px-12 md:py-4 flex items-center justify-between bg-transparent backdrop-blur-[6px]">
    <Link to="/" className="text-sm md:text-base font-serif tracking-wide text-foreground">
      Emma & Cooper
    </Link>
    <Link to="/rsvp" className="text-xs font-sans tracking-[0.15em] uppercase text-foreground hover:opacity-70 transition-opacity">
      RSVP
    </Link>
  </nav>
);

export default Navigation;
