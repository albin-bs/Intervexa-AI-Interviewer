export default function PrimaryButton({
  children,
  as = "button",
  href,
  to,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  if (as === "a") {
    return (
      <a href={href} className={`${base} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  // if you want React Router support later, you can wrap Link here
  return (
    <button type="button" className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
