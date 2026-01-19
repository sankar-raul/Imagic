import { useCallback } from "react";

const useCustomScroll = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const scrollToTopImmediate = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return {
    scrollToTop,
    scrollToTopImmediate,
    scrollToId,
  };
};

export default useCustomScroll;
