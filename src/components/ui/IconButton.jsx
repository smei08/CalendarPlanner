export default function IconButton({ variant, ...props }) {
  return <button {...props}>{variant || "Button"}</button>;
}
