interface LogoProps {
  src: string;
  alt: string;
}

export default function Logo({ src, alt }: LogoProps) {
  return (
    <div className="h-10 md:h-12 z-20 shrink-0">
      <a href="/">
        <img className="h-full object-contain" src={src} alt={alt} />
      </a>
    </div>
  );
}
