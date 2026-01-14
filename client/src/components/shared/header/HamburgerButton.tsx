interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1.5 relative w-8 h-6 justify-center"
      aria-label="Toggle menu"
    >
      <div
        className={`w-8 h-0.5 bg-gray-800 rounded-full absolute transition-all duration-300 ${
          isOpen ? "-rotate-45" : "top-0"
        }`}
      ></div>
      <div
        className={`w-8 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-8 h-0.5 bg-gray-800 rounded-full absolute transition-all duration-300 ${
          isOpen ? "rotate-45" : "bottom-0"
        }`}
      ></div>
    </button>
  );
}
