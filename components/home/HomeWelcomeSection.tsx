import Image from "next/image";

export default function HomeWelcomeSection() {
  return (
    <section className="home-welcome relative overflow-hidden">
      <Image
        src="/home/welcome-banner.png"
        alt=""
        fill
        className="object-cover object-center"
        unoptimized
        sizes="100vw"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-[min(42vw,380px)] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[min(36vw,420px)] md:px-12 md:py-20 lg:py-24">
        <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a98467]">
          Welcome to Har Ghar Shudhi
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.875rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-[0.02em] text-brand-green-dark">
          A Journey Back to Natural Wellness
        </h2>
        <div
          className="mx-auto mt-5 h-px w-12 bg-luxury-gold/75"
          aria-hidden
        />
        <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-[1.9] text-brand-text/85 md:text-[1.05rem]">
          From the finest ingredients to your home, we ensure complete purity
          and transparency in every product we craft.
        </p>
      </div>
    </section>
  );
}
