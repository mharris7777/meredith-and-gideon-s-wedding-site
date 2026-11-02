import { Link } from "react-router-dom";

const links = [
  { to: "/hotel", label: "Hotel" },
  { to: "/registry", label: "Registry" },
  { to: "/rsvp", label: "RSVP" },
];

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 md:px-12 md:py-4 flex items-center justify-between bg-transparent backdrop-blur-[6px]">
    <Link to="/" className="text-sm md:text-base font-serif tracking-wide text-foreground">
      Emma & Cooper
    </Link>
    <div className="flex items-center gap-5 md:gap-8">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-xs font-sans tracking-[0.15em] uppercase text-foreground hover:opacity-70 transition-opacity"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </nav>
);

export default Navigation;

