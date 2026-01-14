interface DropdownButtonProps {
  label: string;
  onClick?: () => void;
}

export default function DropdownButton({ label, onClick }: DropdownButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-4 text-gray-800 hover:text-gray-900 font-medium text-base transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-black hover:after:w-3/4 after:transition-all after:duration-300 group/navbutton"
    >
      {label}
      <span className="ml-1 text-xs transition-transform duration-300 inline-block origin-center group-hover/navbutton:rotate-180">
        ▼
      </span>
    </button>
  );
}
