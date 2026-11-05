// The last card of the film
export default function Contact() {
  return (
    <section id="contact" className="kt-contact">
      <div className="kt-contact-glow" aria-hidden="true" />
      <div className="kt-contact-inner">
        <img src="/logo-letters.svg" alt="" className="kt-contact-mark" />
        <h2 className="kt-h2">Get in touch</h2>
        <p className="kt-lede">
          Curious about what we&apos;re building, or want to follow our work? We&apos;re always open
          to a conversation.
        </p>
        <a href="mailto:ra.eesa@kabirtechnologies.co.uk" className="kt-cta">
          Contact Us
        </a>
        <p className="kt-mono kt-contact-email">ra.eesa@kabirtechnologies.co.uk</p>
      </div>
      <span className="kt-slate kt-mono" aria-hidden="true">End</span>
    </section>
  );
}
