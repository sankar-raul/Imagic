import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogNavigationProps {
  prevSlug?: string | null;
  nextSlug?: string | null;
  basePath?: string;
}

export default function BlogNavigation({
  prevSlug,
  nextSlug,
  basePath = "/blogs",
}: BlogNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={() => prevSlug && navigate(`${basePath}/${prevSlug}`)}
        disabled={!prevSlug}
        className={`md:cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          prevSlug
            ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-800 hover:text-white hover:scale-105"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous Blog</span>
      </button>

      <button
        onClick={() => nextSlug && navigate(`${basePath}/${nextSlug}`)}
        disabled={!nextSlug}
        className={`md:cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
          nextSlug
            ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-800 hover:text-white hover:scale-105"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <span>Next Blog</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
