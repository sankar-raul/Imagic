export interface ICourse {
  title: string;
  image: string;
  price: string;
  category: string;
  id: string;
  rating: string;
  reviews: string;
  duration: string;
  eligibility: string;
  slug: string;
  tag?: string;
}

export interface NavMenuItem {
  label: string;
  href?: string;
  type: "link" | "dropdown";
  items?: NavCategory[];
}

export interface NavCategory {
  label: string;
  items: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
}

export interface Slide {
  heading: React.ReactNode;
  description: string | null;
  primaryButtonText: string;
  secondaryButtonText: string | null;
  backgroundImage: string;
  imageAlt: string;
  showBadge: boolean;
  bottomText: string;
}

export * from "./comment.types";
