"use client";
import { use_loading_store } from "@/store/loading";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalLoadingOverlay() {
  const { is_loading, message } = use_loading_store();

  return (
    <AnimatePresence>
      {is_loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center text-white">
            <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-lg">{message || "Loading..."}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
