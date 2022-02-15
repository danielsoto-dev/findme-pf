import RouterLink from "next/link";
export const Link = ({ href, children, className, ...props }) => {
  return (
    <RouterLink href={href}>
      <a {...props} className={className}>
        {children}
      </a>
    </RouterLink>
  );
};
