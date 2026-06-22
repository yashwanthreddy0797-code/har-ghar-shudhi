import Image from "next/image";

interface FooterIllustrationProps {
  variant?: "standalone" | "background";
}

export default function FooterIllustration({
  variant = "standalone",
}: FooterIllustrationProps) {
  const isBackground = variant === "background";

  return (
    <div
      className={
        isBackground
          ? "footer-illustration footer-illustration--background pointer-events-none absolute inset-0"
          : "footer-illustration relative w-full overflow-hidden bg-brand-white"
      }
      aria-hidden
    >
      {isBackground ? (
        <>
          <div className="footer-illustration__wash absolute inset-0 md:hidden" />
          <div className="footer-illustration__image-wrap absolute inset-x-0 bottom-0 h-[42%] md:inset-0 md:h-full">
            <Image
              src="/footer/landscape-illustration.jpg"
              alt=""
              width={1024}
              height={409}
              unoptimized
              className="footer-illustration__image h-full w-full object-cover object-bottom md:object-cover"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-brand-cream/98 via-brand-white/92 to-brand-green-dark/25 md:from-brand-cream/98 md:via-brand-white/88 md:to-brand-green-dark/35"
            aria-hidden
          />
        </>
      ) : (
        <Image
          src="/footer/landscape-illustration.jpg"
          alt=""
          width={1024}
          height={409}
          unoptimized
          className="block h-auto w-full object-cover object-bottom"
          sizes="100vw"
        />
      )}
    </div>
  );
}
