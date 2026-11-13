import "./Wallpaper.css";
import "./CompactPages.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { lookupInvitation, submitRSVP, type Invitation } from "@/lib/rsvp";
import Navigation from "@/components/Navigation";

const RSVP = () => {
  const [name, setName] = useState("");
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attending, setAttending] = useState("accepts");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const submissionId = useRef<string>();
  const inFlight = useRef(false);
  const lookupInFlight = useRef(false);

  const findInvitation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (lookupInFlight.current) return;
    lookupInFlight.current = true;
    setLookingUp(true); setLookupError("");
    try { setInvitation(await lookupInvitation(import.meta.env.VITE_RSVP_ENDPOINT, name)); }
    catch (error) { setLookupError(error instanceof Error ? error.message : "Unable to find your invitation. Please try again."); }
    finally { lookupInFlight.current = false; setLookingUp(false); }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!invitation || inFlight.current) return;
    inFlight.current = true; setSending(true); setSubmitError("");
    try {
      submissionId.current ??= crypto.randomUUID();
      await submitRSVP(import.meta.env.VITE_RSVP_ENDPOINT, {
        name: invitation.matchedName, invitationId: invitation.id, token: invitation.token,
        attending, dietary, message, submissionId: submissionId.current,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't confirm your RSVP was saved. Please try again or contact Meredith and Gideon. If your invitation changed or your session expired, find your invitation again.");
    } finally { inFlight.current = false; setSending(false); }
  };
  const startOver = () => {
    setInvitation(null); setSubmitError(""); setLookupError("");
    setAttending("accepts"); setDietary(""); setMessage(""); submissionId.current = undefined;
  };

  return (
    <div className="min-h-screen wallpaper-page wallpaper-rsvp rsvp-compact">
      <Navigation />
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 text-center">
        <div className="content-left">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className={submitted ? "text-4xl md:text-6xl lg:text-8xl font-serif text-foreground mb-6 md:mb-8 leading-tight" : "rsvp-script-heading text-foreground"}>
            {submitted ? "Thank You!" : "Kindly Respond"}
          </motion.h1>
          <p className={submitted ? "body-text mb-3" : "rsvp-deadline"}>
            {submitted ? (attending === "accepts" ? "Your household's RSVP has been received. We can't wait to celebrate with you!" : "Your household's RSVP has been received. We'll miss you!") : "BY THE SEVENTH OF AUGUST"}
          </p>
        </div>
      </section>

      {!submitted && !invitation && (
        <form onSubmit={findInvitation} className="content-left px-6 pb-24">
          <div>
            <div className="col-span-full mb-6 md:mb-8">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input id="name" name="name" autoComplete="name" value={name} onChange={e => { setName(e.target.value); setLookupError(""); }} required disabled={lookingUp} className="form-input" aria-describedby="lookup-help" />
              <p id="lookup-help" className="mt-3 text-base font-sans text-foreground">Enter the first and last name of anyone on your invitation to find your whole household.</p>
            </div>
            {lookupError && <p role="alert" className="body-text mb-6">{lookupError}</p>}
            <button disabled={lookingUp} aria-busy={lookingUp} type="submit" className="btn-primary w-full text-xl md:text-2xl text-center">{lookingUp ? "Finding Your Invitation…" : "Find My Invitation"}</button>
          </div>
        </form>
      )}

      {!submitted && invitation && (
        <form onSubmit={handleSubmit} className="content-left px-6 pb-24">
          <div>
            <div className="col-span-full mb-6 md:mb-8" aria-live="polite">
              <h2 className="text-2xl md:text-3xl font-serif mb-4">Your Invitation</h2>
              <ul className="space-y-2 text-xl md:text-2xl font-serif">{invitation.names.map((guest, index) => <li key={`${guest}-${index}`}>{guest}</li>)}</ul>
              <p className="mt-4 text-base font-sans">{invitation.guestCount} invited {invitation.guestCount === 1 ? "guest" : "guests"}. Your response applies to everyone listed above.</p>
              <button type="button" onClick={startOver} disabled={sending} className="btn-ghost mt-4 text-base">Find a Different Invitation</button>
            </div>
            <div className="rsvp-attendance mb-6 md:mb-8" role="group" aria-labelledby="attendance-label">
              <p id="attendance-label" className="form-label">Will your household be attending?</p>
              <div className="flex flex-col gap-3">
                {[{ value: "accepts", label: "Joyfully Accepts" }, { value: "declines", label: "Regretfully Declines" }].map(option => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="attending" value={option.value} checked={attending === option.value} disabled={sending} onChange={e => setAttending(e.target.value)} className="w-6 h-6 accent-foreground" />
                    <span className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {attending === "accepts" && <div className="col-span-full mb-6 md:mb-8">
              <label htmlFor="dietary" className="form-label">Dietary Restrictions</label>
              <input id="dietary" name="dietary" type="text" placeholder="Please include the guest's name for any restrictions" value={dietary} disabled={sending} onChange={e => setDietary(e.target.value)} className="form-input" />
            </div>}
            <div className="rsvp-message mb-6 md:mb-8">
              <label htmlFor="message" className="form-label">Personal Message</label>
              <textarea id="message" name="message" placeholder="A note for Meredith and Gideon" value={message} disabled={sending} onChange={e => setMessage(e.target.value)} className="form-input resize-vertical min-h-[120px]" />
            </div>
            {submitError && <p role="alert" className="body-text mb-6">{submitError}</p>}
            <button disabled={sending} aria-busy={sending} type="submit" className="btn-primary w-full text-xl md:text-2xl text-center">{sending ? "Sending…" : "Send RSVP"}</button>
          </div>
        </form>
      )}
    </div>
  );
};
export default RSVP;
