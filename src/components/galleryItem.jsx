import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GalleryItem({ src, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
      onClick={() => window.open(src, '_blank')}
    >
      <img src={src} alt={`Look ${index + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
        <p className="text-sm tracking-widest">CAMPAIGN {String(index + 1).padStart(2, '0')}</p>
      </div>
    </motion.div>
  );
}