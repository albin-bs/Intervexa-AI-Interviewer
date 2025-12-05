import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatBlock({
  label,
  value,
  icon,
  trend,
  trendValue,
  description,
  variant = "default",
  animated = true,
  delay = 0,
  className = "",
}) {
  // Variant styles
  const variants = {
    default: "bg-slate-900/50 border-slate-800",
    primary: "bg-blue-500/10 border-blue-500/30",
    success: "bg-emerald-500/10 border-emerald-500/30",
    warning: "bg-amber-500/10 border-amber-500/30",
    danger: "bg-rose-500/10 border-rose-500/30",
    gradient: "bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-blue-500/30",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    },
  };

  const valueVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: delay + 0.2,
        ease: "easeOut",
      },
    },
  };

  // Counter animation for numbers
  const animateValue = (start, end, duration = 1000) => {
    const isNumber = !isNaN(parseFloat(end));
    if (!isNumber) return end;

    // This would need a proper counter hook in production
    return end;
  };

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-white/5 to-transparent group-hover:opacity-100" />

      <div className="relative px-6 py-6 text-center sm:py-7">
        {/* Icon */}
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 mb-3 border rounded-full bg-white/5 border-white/10"
          >
            <div className="text-blue-400">{icon}</div>
          </motion.div>
        )}

        {/* Label */}
        <dt className="mb-2 text-sm font-medium text-slate-400">
          {label}
        </dt>

        {/* Value */}
        <motion.dd
          variants={valueVariants}
          className="mb-1 text-3xl font-bold text-white sm:text-4xl"
        >
          {value}
        </motion.dd>

        {/* Trend indicator */}
        {trend && trendValue && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.4 }}
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              trend === "up"
                ? "text-emerald-400"
                : trend === "down"
                ? "text-rose-400"
                : "text-slate-400"
            }`}
          >
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            <span>{trendValue}</span>
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
            className="mt-2 text-xs text-slate-500"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Animated border pulse effect */}
      {variant === "gradient" && (
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 border pointer-events-none rounded-2xl border-blue-500/50"
        />
      )}
    </Wrapper>
  );
}
