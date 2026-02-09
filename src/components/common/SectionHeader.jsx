import { m } from "framer-motion";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  maxWidth = "2xl", // "xl" | "2xl" | "3xl" | "4xl" | "full"
  animated = true,
  titleGradient = false, // Enable gradient text on title
  badge = false, // Show badge style for eyebrow
  className = "",
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const maxWidthClasses = {
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const Container = animated ? m.div : "div";
  const Item = animated ? m.div : "div";

  return (
    <Container
      {...(animated && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
        variants: containerVariants,
      })}
      className={`flex flex-col ${alignClasses[align]} ${maxWidthClasses[maxWidth]} gap-4 mb-10 sm:mb-12 lg:mb-16 ${className}`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <Item
          {...(animated && { variants: itemVariants })}
        >
          {badge ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {eyebrow}
            </span>
          ) : (
            <p className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 relative">
              {eyebrow}
              {/* Underline accent */}
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent" />
            </p>
          )}
        </Item>
      )}

      {/* Title */}
      {title && (
        <Item
          {...(animated && { variants: itemVariants })}
        >
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight ${
              titleGradient
                ? "bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                : "text-white"
            }`}
          >
            {title}
          </h2>
        </Item>
      )}

      {/* Description */}
      {description && (
        <Item
          {...(animated && { variants: itemVariants })}
        >
          <p className="max-w-2xl text-base leading-relaxed sm:text-lg lg:text-xl text-slate-400">
            {description}
          </p>
        </Item>
      )}

      {/* Optional: Decorative line */}
      {animated && align === "center" && (
        <m.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 60, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="h-1 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      )}
    </Container>
  );
}

// Optional: Export preset variants
export function HeroHeader(props) {
  return (
    <SectionHeader
      {...props}
      titleGradient
      badge
      maxWidth="4xl"
      className="mb-12 lg:mb-20"
    />
  );
}

export function FeatureHeader(props) {
  return (
    <SectionHeader
      {...props}
      badge
      maxWidth="3xl"
    />
  );
}

export function CompactHeader(props) {
  return (
    <SectionHeader
      {...props}
      maxWidth="2xl"
      className="mb-8"
    />
  );
}
