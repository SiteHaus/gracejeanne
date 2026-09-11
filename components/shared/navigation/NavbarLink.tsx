import Link from "next/link";

export interface NavbarLinkType {
  name: string;
  target: string;
}

export const NavbarLink = ({
  target,
  name,
  className,
}: NavbarLinkType & { className?: string }) => {
  return (
    <Link href={target} className={`text-sm transition-colors ${className}`}>
      {name}
    </Link>
  );
};
