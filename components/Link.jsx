import RouterLink from "next/link";
export const Link = ({
  href,
  children,
  className = "",
  animated = true,
  ...props
}) => {
  if (animated) {
    className = `underline-effect ${className}`;
  }
  return (
    <RouterLink href={href}>
      <a {...props} className={className}>
        {children}
      </a>
    </RouterLink>
  );
};
