import { SiJordan, SiNike } from "react-icons/si";

export type BrandNavbarProps = {
  brandIcon: JSX.Element;
  brandName: string;
};

export type LinkProps = {
  link: string;
  title: string;
};

export const links: LinkProps[] = [
  { link: "/men", title: "Homme" },
  { link: "/women", title: "Femme" },
  { link: "/kid", title: "Enfant" },
];

export const brands: BrandNavbarProps[] = [
  { brandIcon: <SiJordan />, brandName: "Jordan" },
  { brandIcon: <SiNike />, brandName: "Nike" },
];
