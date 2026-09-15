"use client";
import { useRef, useState } from "react";
import { usePreferences } from "./Preferences";
import SocialLinks from "./SocialLinks";
export default function ContactForm() {
  const { language } = usePreferences();
  const fr = language === "fr";
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const id = useRef(null);
  const pending = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    if (!id.current) id.current = crypto.randomUUID();
    pending.current = true;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: id.current }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setError(data.code || "delivery");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
      id.current = null;
    } catch {
      setError("delivery");
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }
  const errorText =
    error === "unconfigured"
      ? fr
        ? "L’envoi est momentanément indisponible. Écrivez-moi directement par email."
        : "Sending is currently unavailable. Please email me directly."
      : error === "rate_limit"
        ? fr
          ? "Trop de tentatives. Réessayez dans 10 minutes ou écrivez-moi par email."
          : "Too many attempts. Retry in 10 minutes or email me directly."
        : error === "validation"
          ? fr
            ? "Vérifiez les champs : le message doit contenir au moins 20 caractères."
            : "Please check your details: your message needs at least 20 characters."
          : fr
            ? "L’envoi n’a pas pu être confirmé. Votre texte est conservé ; vous pouvez réessayer ou me contacter par email."
            : "Delivery could not be confirmed. Your text is preserved; retry or contact me by email.";
  return (
    <div className="contact-workspace">
      <div className="contact-invitation">
        <p className="eyebrow">
          {fr ? "FAISONS CONNAISSANCE" : "LET’S GET ACQUAINTED"}
        </p>
        <h3>
          {fr ? "La prochaine belle idée" : "The next great idea"}
          <br />
          <em>{fr ? "commence ici." : "starts here."}</em>
        </h3>
        <p>
          {fr
            ? "Un projet, une opportunité ou simplement une envie d’échanger ? Racontez-moi."
            : "A project, an opportunity, or just a conversation? Tell me about it."}
        </p>
        <a className="direct-email-cta" href="mailto:waelfezari@gmail.com">
          {fr ? "M’écrire par email" : "Email me"}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        onChange={() => {
          if (!pending.current) {
            id.current = null;
            if (status === "sent") setStatus("idle");
          }
        }}
      >
        <fieldset disabled={status === "sending"}>
          <legend className="sr-only">
            {fr ? "Votre message" : "Your message"}
          </legend>
          <div className="form-row">
            <label>
              {fr ? "Votre nom" : "Your name"}
              <span aria-hidden="true"> *</span>
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                placeholder={
                  fr ? "Comment vous appelez-vous ?" : "What’s your name?"
                }
              />
            </label>
            <label>
              {fr ? "Adresse email" : "Email address"}
              <span aria-hidden="true"> *</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="vous@exemple.com"
              />
            </label>
          </div>
          <label>
            {fr ? "Téléphone" : "Phone number"}
            <span className="optional">
              {fr ? " / facultatif" : " / optional"}
            </span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="+33 6 …"
            />
          </label>
          <label>
            {fr ? "Votre message" : "Your message"}
            <span aria-hidden="true"> *</span>
            <textarea
              name="message"
              required
              minLength={20}
              maxLength={5000}
              rows={5}
              placeholder={
                fr
                  ? "Parlez-moi de votre projet, de votre équipe ou de votre idée…"
                  : "Tell me about your project, your team or your idea…"
              }
            />
          </label>
          <div className="form-honeypot" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-bottom">
            <p>
              {fr
                ? "Vos coordonnées et votre message servent uniquement à vous répondre. Envoi via Resend."
                : "Your details and message are used only to reply to you. Sent through Resend."}
            </p>
            <button type="submit" className="send-button">
              {status === "sending"
                ? fr
                  ? "Envoi en cours…"
                  : "Sending…"
                : fr
                  ? "Envoyer le message"
                  : "Send message"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </fieldset>
        <div
          className={`form-status ${status}`}
          role="status"
          aria-live="polite"
        >
          {status === "sent" ? (
            fr ? (
              "Merci ! Votre message a été envoyé. À bientôt."
            ) : (
              "Thank you! Your message has been sent. Talk soon."
            )
          ) : status === "error" ? (
            <>
              {errorText}{" "}
              <a href="mailto:waelfezari@gmail.com">waelfezari@gmail.com ↗</a>
            </>
          ) : null}
        </div>
      </form>
      <div className="contact-socials">
        <SocialLinks />
      </div>
    </div>
  );
}
