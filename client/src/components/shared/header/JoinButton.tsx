interface JoinButtonProps {
  onClick?: () => void;
}
export default function JoinButton({ onClick }: JoinButtonProps) {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <div onClick={handleClick} className="hidden lg:block z-20 shrink-0">
      <div className="px-7 py-3 bg-yellow-300 hover:bg-yellow-400 md:cursor-pointer text-black font-semibold rounded-full inline-flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
        Join Now
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>
  );
}
