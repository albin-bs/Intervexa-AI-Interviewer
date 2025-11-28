// src/components/common/FeatureCard.jsx
export default function FeatureCard({
  title,
  heading,
  description,
  children, // e.g. image or code block
  className = "",
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 ${className}`}
    >
      <div className="px-6 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-2">
        {title && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
            {title}
          </p>
        )}
        {heading && (
          <p className="mt-2 text-lg font-medium tracking-tight text-white">
            {heading}
          </p>
        )}
        {description && (
          <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
