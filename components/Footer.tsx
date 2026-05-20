"use client";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-30 border-t border-luxury-emerald/20 bg-luxury-black px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl font-light text-luxury-cream md:text-4xl">
              Luxury Ayurvedic Living
            </p>
            <p className="mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-luxury-cream/50">
              Herbal wellness, adaptogenic supplements, and organic ingredients
              — from farm to fork, crafted for modern wellbeing.
            </p>
          </div>

          <div className="space-y-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Connect
            </p>
            <ul className="space-y-3 font-sans text-sm text-luxury-cream/60">
              <li>
                <a
                  href="mailto:hello@hargharshudhi.com"
                  className="transition-colors hover:text-luxury-gold"
                >
                  hello@hargharshudhi.com
                </a>
              </li>
              <li className="text-luxury-cream/40">Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-luxury-emerald/10 pt-8 md:flex-row">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-luxury-cream/30">
            © {new Date().getFullYear()} Har Ghar Shudhi. All rights reserved.
          </p>
          <p className="font-serif text-sm italic text-luxury-gold/50">
            शुद्धि — Purity in every home.
          </p>
        </div>
      </div>
    </footer>
  );
}
