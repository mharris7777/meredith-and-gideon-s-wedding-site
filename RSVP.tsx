import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attending, setAttending] = useState<string>("accepts");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    guests: "1",
    dietary: "",
    questions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const endpoint = import.meta.env.VITE_RSVP_ENDPOINT;
    if (!endpoint) {
      setSubmitError("RSVP submissions are not configured yet. Please try again later.");
      return;
    }
    setSending(true);
    setSubmitError("");
    try {
      const submissionId = crypto.randomUUID();
      const body = new URLSearchParams({
        name: formData.name.trim(),
        email: formData.email.trim(),
        attending,
        guests: attending === "accepts" ? formData.guests : "0",
        dietary: attending === "accepts" ? formData.dietary : "",
        message: formData.message,
        submissionId,
        website: "", // Honeypot: leave blank
      });
      // Google Apps Script web apps don't provide CORS response headers.
      // A successful opaque response only confirms browser delivery, not a saved row.
      await fetch(endpoint, { method: "POST", mode: "no-cors", body });
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't send your RSVP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageHero />
        <div className="pb-24 px-6 flex items-center justify-center">
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
              Your RSVP was sent. We can't wait to celebrate with you!
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "" },
    { label: "Email Address", name: "email", type: "email", placeholder: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageHero />

      <section className="pb-12 md:pb-16 px-6 text-center">
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
            <div key={field.name} className="mb-6 md:mb-8">
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

          <div className="mb-6 md:mb-8">
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

          <div className="mb-6 md:mb-8">
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

          {submitError && <p role="alert" className="mb-4 text-red-700">{submitError}</p>}
          <button type="submit" disabled={sending} className="btn-primary w-full text-xl md:text-2xl text-center disabled:opacity-60">
            {sending ? "Sending…" : "Send RSVP"}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default RSVP;
