import "./button.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...rest
}) {
  const isDisabled = disabled || isLoading;

  const classes = [
    "ui-btn",
    variant,
    `size-${size}`,
    fullWidth ? "full-width" : "",
    isLoading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {isLoading && <span className="spinner" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}
