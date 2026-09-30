"use client";
import { useRef, useState } from "react";
import { usePreferences } from "./Preferences";
import SocialLinks from "./SocialLinks";
import { FiSend, FiCheckCircle } from "react-icons/fi";
export default function ContactForm() {
  const { language } = usePreferences();
  const fr = language === "fr";
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState({});
  function fieldError(field) {
    const value = field.value.trim();
    if (field.name === "name" && (value.length < 2 || value.length > 80 || /[\r\n\x00-\x1f]/.test(value))) return fr ? "Indiquez votre nom (2 à 80 caractères)." : "Enter your name (2–80 characters).";
    if (field.name === "email" && (!value || !field.validity.valid)) return fr ? "Indiquez une adresse email valide." : "Enter a valid email address.";
    if (field.name === "phone" && value && !/^[+\d\s().-]{6,40}$/.test(value)) return fr ? "Vérifiez le numéro (6 à 40 caractères)." : "Check the phone number (6–40 characters).";
    if (field.name === "message" && (value.length < 20 || value.length > 5000)) return fr ? "Écrivez un message de 20 à 5 000 caractères." : "Write a message of 20–5,000 characters.";
    return "";
  }
  const id = useRef(null);
  const pending = useRef(false);
  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const invalid = {};
    for (const name of ["name", "email", "phone", "message"]) {
      const message = fieldError(form.elements.namedItem(name));
      if (message) invalid[name] = message;
    }
    setFields(invalid);
    if (Object.keys(invalid).length) {
      form.elements.namedItem(Object.keys(invalid)[0]).focus();
      return;
    }
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
      setFields({});
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
        <h3>
          {fr ? "Parlons de votre projet" : "Tell me what you’re building"}
        </h3>
        <p>
          {fr
            ? "Un projet, une opportunité ou simplement une envie d’échanger ? Racontez-moi."
            : "A project, an opportunity, or just a conversation? Tell me about it."}
        </p>
      </div>
      <form
        className="contact-form"
        noValidate
        aria-busy={status === "sending"}
        onSubmit={submit}
        onBlur={(event) => {
          if (!["name", "email", "phone", "message"].includes(event.target.name)) return;
          const field = event.target;
          setFields(previous => ({ ...previous, [field.name]: fieldError(field) }));
        }}
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
                aria-invalid={Boolean(fields.name)}
                aria-describedby={fields.name ? "name-error" : undefined}
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                placeholder={
                  fr ? "Comment vous appelez-vous ?" : "What’s your name?"
                }
              />
              {fields.name && <span className="field-error" id="name-error">{fields.name}</span>}
            </label>
            <label>
              {fr ? "Adresse email" : "Email address"}
              <span aria-hidden="true"> *</span>
              <input
                name="email"
                aria-invalid={Boolean(fields.email)}
                aria-describedby={fields.email ? "email-error" : undefined}
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder={fr ? "vous@exemple.com" : "you@example.com"}
              />
              {fields.email && <span className="field-error" id="email-error">{fields.email}</span>}
            </label>
          </div>
          <label>
            {fr ? "Téléphone" : "Phone number"}
            <span className="optional">
              {fr ? " / facultatif" : " / optional"}
            </span>
            <input
              name="phone"
              aria-invalid={Boolean(fields.phone)}
              aria-describedby={fields.phone ? "phone-error" : undefined}
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="+33 6 …"
            />
            {fields.phone && <span className="field-error" id="phone-error">{fields.phone}</span>}
          </label>
          <label>
            {fr ? "Votre message" : "Your message"}
            <span aria-hidden="true"> *</span>
            <textarea
              name="message"
              aria-invalid={Boolean(fields.message)}
              aria-describedby={fields.message ? "message-error" : undefined}
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
            {fields.message && <span className="field-error" id="message-error">{fields.message}</span>}
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
              {status === "sent" ? <FiCheckCircle aria-hidden="true" /> : <FiSend aria-hidden="true" />}
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
              <a href="mailto:waelfezari@gmail.com">waelfezari@gmail.com</a>
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
