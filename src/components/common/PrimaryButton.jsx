import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrimaryButton({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  href,
  to,
  className = "",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "right",
  fullWidth = false,
  animated = true,
  ...props
}) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:shadow-blue-500/40 focus-visible:ring-blue-500",
    secondary:
      "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 focus-visible:ring-slate-500",
    success:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:shadow-emerald-500/40 focus-visible:ring-emerald-500",
    danger:
      "bg-rose-600 text-white shadow-lg shadow-rose-500/30 hover:bg-rose-500 hover:shadow-rose-500/40 focus-visible:ring-rose-500",
    ghost:
      "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white focus-visible:ring-slate-500",
    outline:
      "bg-transparent text-blue-400 border border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-400 focus-visible:ring-blue-500",
    gradient:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] focus-visible:ring-blue-500",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
    xl: "px-10 py-4 text-lg",
  };

  // Combine classes
  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="w-4 h-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Content with icon and loading state
  const ButtonContent = () => (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  // Wrapper for animation
  const AnimationWrapper = ({ children }) =>
    animated ? (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-flex"
      >
        {children}
      </motion.div>
    ) : (
      children
    );

  // Render as Link (React Router)
  if (to) {
    return (
      <AnimationWrapper>
        <Link to={to} className={classes} {...props}>
          <ButtonContent />
        </Link>
      </AnimationWrapper>
    );
  }

  // Render as anchor tag
  if (as === "a" || href) {
    return (
      <AnimationWrapper>
        <a
          href={href}
          className={classes}
          {...props}
        >
          <ButtonContent />
        </a>
      </AnimationWrapper>
    );
  }

  // Render as button (default)
  return (
    <AnimationWrapper>
      <button
        type="button"
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        <ButtonContent />
      </button>
    </AnimationWrapper>
  );
}
