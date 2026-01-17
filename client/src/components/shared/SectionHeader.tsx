interface SectionHeaderProps {
  title: string;
  className?: string;
}

export default function SectionHeader({
  title,
  className = "",
}: SectionHeaderProps) {
  return (
    <h1
      className={`md:text-5xl text-3xl font-semibold text-black font-serif text-center  ${className}`}
    >
      {title}
    </h1>
  );
}
