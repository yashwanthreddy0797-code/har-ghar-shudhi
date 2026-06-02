import Image from "next/image";

export default function FooterIllustration() {
  return (
    <div
      className="footer-illustration relative w-full overflow-hidden bg-brand-white"
      aria-hidden
    >
      <Image
        src="/footer/landscape-illustration.jpg"
        alt=""
        width={1024}
        height={409}
        unoptimized
        className="block h-auto w-full object-cover object-bottom"
        sizes="100vw"
      />
    </div>
  );
}
