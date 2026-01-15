interface ICourseItems {
  [category: string]: ICourseItem[];
}

interface ICourseItem {
  title: string;
  slug: string;
}

export type { ICourseItems };
