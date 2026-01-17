interface ViewAllButtonProps {
  href: string;
  primaryText?: string;
  secondaryText?: string;
}

export default function ViewAllButton({
  href,
  primaryText = "See All Jobs",
  secondaryText = "Jobs",
}: ViewAllButtonProps) {
  return (
    <div className="flex justify-center">
      <a href={href}>
        <button className="group px-8 py-2.5 bg-neutral-50/50 border-neutral-200 border rounded-lg text-neutral-800 font-semibold cursor-pointer active:scale-95 transition duration-300 hover:text-white hover:bg-neutral-700">
          <p className="relative h-6 overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
              {primaryText}
            </span>
            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:-translate-y-full">
              {secondaryText}
            </span>
          </p>
        </button>
      </a>
    </div>
  );
}
