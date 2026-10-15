export default function Logo({
  variant = "onLight",
  size = "md",
  className = "",
}) {
  const dark = variant === "onDark";

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }[size];

  return (
    <span
      className={`group inline-flex items-baseline font-bold tracking-tight select-none transition-all duration-200 ${sizeClasses} ${
        dark ? "text-white" : "text-ink"
      } ${className}`}
    >
      <span>Mob</span>
      <span
        className={`mx-[1px] transition-colors duration-200 font-normal ${
          dark ? "text-sand" : "text-bark"
        }`}
      >
        ’
      </span>
      <span>in</span>
    </span>
  );
}
