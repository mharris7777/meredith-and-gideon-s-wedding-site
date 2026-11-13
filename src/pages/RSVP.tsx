import "./Wallpaper.css";
import "./CompactPages.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { submitRSVP } from "@/lib/rsvp";
import Navigation from "@/components/Navigation";

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submissionId = useRef<string>();
  const inFlight = useRef(false);
  const [attending, setAttending] = useState<string>("accepts");
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    guests: "1",
    dietary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setSubmitError("");
    try {
      submissionId.current ??= crypto.randomUUID();
      await submitRSVP(import.meta.env.VITE_RSVP_ENDPOINT, {
        ...formData, attending, submissionId: submissionId.current,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't confirm your RSVP was saved. Please try again or contact Meredith and Gideon. Your response may have arrived; please contact us if you are unsure.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen wallpaper-page wallpaper-rsvp">
        <Navigation />
        <div className="pt-24 md:pt-32 pb-24 px-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0 }}
            className="content-left text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground mb-6">
              Thank You!
            </h2>
            <p className="body-text">
              Your RSVP has been received. We can't wait to celebrate with you!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "" },
  ];

  return (
    <div className="min-h-screen wallpaper-page wallpaper-rsvp rsvp-compact">
      <Navigation />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 text-center">
        <div className="content-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground mb-6 md:mb-8 leading-tight"
          >
            We Look Forward to Seeing You!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="body-text mb-3"
          >
            Please RSVP by August 4, 2027
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-serif"
          >
            Your response helps us plan an unforgettable celebration
          </motion.p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="content-left px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          {fields.map((field) => (
            <div key={field.name} className="col-span-full mb-6 md:mb-8">
              <label htmlFor={field.name} className="form-label">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          ))}

          <div className="rsvp-attendance mb-6 md:mb-8">
            <label className="form-label">Will you be attending?</label>
            <div className="flex flex-col gap-3">
              {[
                { value: "accepts", label: "Joyfully Accepts" },
                { value: "declines", label: "Regretfully Declines" },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={attending === option.value}
                    onChange={(e) => setAttending(e.target.value)}
                    className="w-6 h-6 accent-foreground"
                  />
                  <span className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {attending === "accepts" && (
            <>
              <div className="mb-6 md:mb-8">
                <label htmlFor="guests" className="form-label">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-input"
                >
                  {["1", "2", "3", "4", "5+"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6 md:mb-8">
                <label htmlFor="dietary" className="form-label">Dietary Restrictions</label>
                <input
                  id="dietary"
                  name="dietary"
                  type="text"
                  placeholder="Vegetarian, no nuts, etc."
                  value={formData.dietary}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          )}

          <div className="rsvp-message mb-6 md:mb-8">
            <label htmlFor="message" className="form-label">Personal Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Can't wait to celebrate with you both!"
              value={formData.message}
              onChange={handleChange}
              className="form-input resize-vertical min-h-[120px]"
            />
          </div>

          {submitError && <p role="alert" className="body-text mb-6">{submitError}</p>}
          <button disabled={sending} aria-busy={sending} type="submit" className="btn-primary w-full text-xl md:text-2xl text-center">
            {sending ? "Sending…" : "Send RSVP"}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default RSVP;
