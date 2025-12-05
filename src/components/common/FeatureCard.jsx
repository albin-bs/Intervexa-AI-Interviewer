import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({
  title,
  heading,
  description,
  children,
  className = "",
  variant = "default", // "default" | "gradient" | "highlight"
  icon, // Optional icon component
  link, // Optional link
  onLinkClick, // Optional click handler
  delay = 0, // Animation delay
}) {
  const variants = {
    default: "bg-slate-900/80 border-slate-800",
    gradient: "bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 border-slate-700/50",
    highlight: "bg-gradient-to-br from-blue-900/30 via-slate-900/80 to-indigo-900/30 border-blue-800/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 ${variants[variant]} ${className}`}
    >
      {/* Top gradient glow effect */}
      <div className="absolute inset-x-0 top-0 h-px transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent group-hover:opacity-100" />

      {/* Content Container */}
      <div className="relative z-10 px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-4">
        {/* Icon + Title Row */}
        <div className="flex items-center gap-3 mb-2">
          {icon && (
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-10 h-10 text-blue-400 transition-colors border rounded-xl bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20"
            >
              {icon}
            </motion.div>
          )}
          
          {title && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 group-hover:text-indigo-200 transition-colors">
              {title}
            </p>
          )}
        </div>

        {/* Heading */}
        {heading && (
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white transition-colors sm:text-xl group-hover:text-blue-50">
            {heading}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="max-w-lg mt-3 text-sm leading-relaxed transition-colors text-slate-400 group-hover:text-slate-300">
            {description}
          </p>
        )}

        {/* Optional Link */}
        {link && (
          <button
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 group/link"
          >
            <span>{link}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </button>
        )}
      </div>

      {/* Children Content Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-900/20" />
        
        {/* Content */}
        <div className="relative h-full">
          {children}
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent group-hover:opacity-100" />

      {/* Corner accent */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
        className="absolute w-2 h-2 transition-colors rounded-full top-4 right-4 bg-blue-400/50 group-hover:bg-blue-400"
      />
    </motion.div>
  );
}

// Optional: Export variant versions as separate components
export function GradientFeatureCard(props) {
  return <FeatureCard {...props} variant="gradient" />;
}

export function HighlightFeatureCard(props) {
  return <FeatureCard {...props} variant="highlight" />;
}
