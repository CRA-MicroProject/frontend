"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useIntl } from "react-intl";

const CONTACT_API = "/api/contact";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Contributor contact form; POSTs JSON to {@link CONTACT_API}. */
const ContactForm = () => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [helpDescription, setHelpDescription] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedHelp = helpDescription.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setFeedback(intl.formatMessage({ id: "app.contact.validationEmailRequired" }));
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setFeedback(intl.formatMessage({ id: "app.contact.validationEmailInvalid" }));
      return;
    }
    if (!trimmedName) {
      setStatus("error");
      setFeedback(intl.formatMessage({ id: "app.contact.validationNameRequired" }));
      return;
    }
    if (!trimmedHelp) {
      setStatus("error");
      setFeedback(intl.formatMessage({ id: "app.contact.validationHelpRequired" }));
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          helpDescription: trimmedHelp,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        setFeedback(intl.formatMessage({ id: "app.contact.errorServer" }));
        return;
      }

      setStatus("success");
      setFeedback(intl.formatMessage({ id: "app.contact.successSent" }));
      setName("");
      setEmail("");
      setHelpDescription("");
    } catch {
      setStatus("error");
      setFeedback(intl.formatMessage({ id: "app.contact.errorNetwork" }));
    }
  };

  const isLoading = status === "loading";

  return (
    <section className="mx-auto max-w-3xl border-t border-slate-100 px-6 py-20 sm:px-8 lg:px-12">
      <div className="mb-10 text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#0d9488]">
          {intl.formatMessage({ id: "app.contact.top-title" })}
        </p>
        <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {intl.formatMessage({ id: "app.contact.headline" })}
        </h2>
        <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
          {intl.formatMessage({ id: "app.contact.intro" })}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_20px_35px_rgba(148,163,184,0.12)] transition-shadow duration-200 hover:shadow-[0_20px_35px_rgba(148,163,184,0.2)] sm:p-10">
        <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-bold text-slate-800">
              {intl.formatMessage({ id: "app.contact.nameLabel" })}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={intl.formatMessage({ id: "app.contact.namePlaceholder" })}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              disabled={isLoading}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 text-slate-900 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#99f6e4] focus:bg-white focus:ring-2 focus:ring-[#0d9488]/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-bold text-slate-800">
              {intl.formatMessage({ id: "app.contact.emailLabel" })}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={intl.formatMessage({ id: "app.contact.emailPlaceholder" })}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={isLoading}
              className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 text-slate-900 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#99f6e4] focus:bg-white focus:ring-2 focus:ring-[#0d9488]/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-help" className="text-sm font-bold text-slate-800">
              {intl.formatMessage({ id: "app.contact.helpLabel" })}
            </label>
            <textarea
              id="contact-help"
              name="helpDescription"
              rows={5}
              placeholder={intl.formatMessage({ id: "app.contact.helpPlaceholder" })}
              value={helpDescription}
              onChange={(ev) => setHelpDescription(ev.target.value)}
              disabled={isLoading}
              className="min-h-[8rem] resize-y rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 text-slate-900 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#99f6e4] focus:bg-white focus:ring-2 focus:ring-[#0d9488]/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-3xl bg-[#0d9488] px-8 py-4 text-lg font-bold text-white shadow-[0_20px_30px_rgba(20,184,166,0.3)] transition-[transform,background-color] hover:bg-[#0f766e] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isLoading ? (
                <>
                  {intl.formatMessage({ id: "app.contact.sending" })}
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                </>
              ) : (
                <>
                  {intl.formatMessage({ id: "app.contact.submit" })}
                  <Send className="h-5 w-5 shrink-0" aria-hidden />
                </>
              )}
            </button>
            {feedback ? (
              <p
                className={`mt-4 text-center text-sm font-medium sm:text-left ${
                  status === "success" ? "text-[#0f766e]" : "text-red-600"
                }`}
                role={status === "success" ? "status" : "alert"}
              >
                {feedback}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
