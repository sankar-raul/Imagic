import { cn } from "@/lib/utils";
import styles from "./htmlRenderer.module.css";
interface HtmlRendererProps {
  content: string;
  className?: string;
}
export const HtmlRenderer = ({ content, className }: HtmlRendererProps) => {
  return (
    <div
      className={cn("prose prose-sm sm:prose max-w-none", className, styles._)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlRenderer;
