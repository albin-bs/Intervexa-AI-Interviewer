// src/components/common/SectionHeader.jsx

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignClass} gap-3 mb-8 sm:mb-10`}>
      {eyebrow && (
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
