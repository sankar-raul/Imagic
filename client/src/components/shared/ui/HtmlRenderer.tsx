import { cn } from "@/lib/utils";

interface HtmlRendererProps {
  content: string;
  className?: string;
}

/**
 * HtmlRenderer - A safe wrapper component for rendering HTML content
 *
 * @param content - The HTML string to render
 * @param className - Optional additional CSS classes
 */
export const HtmlRenderer = ({ content, className }: HtmlRendererProps) => {
  return (
    <div
      className={cn("prose prose-sm sm:prose max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlRenderer;
