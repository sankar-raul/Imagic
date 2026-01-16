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
      className={`md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins] ${className}`}
    >
      {title}
    </h1>
  );
}
