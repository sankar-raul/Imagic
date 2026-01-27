import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
  alt?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose, alt }) => {
  if (!imageUrl) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl min-h-1/2 bg-black rounded-lg overflow-hidden flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={imageUrl}
            alt={alt || "Image preview"}
            className="h-full! rounded-lg object-contain aspect-square w-full"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
