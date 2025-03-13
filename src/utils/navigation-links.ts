import { ContentType } from "@/contexts/change-content-context";

interface INavigationLinks {
  title: string;
  contentType: ContentType;
}

export const navigationLinks: INavigationLinks[] = [
  {
    title: "Register client",
    contentType: ContentType.Register,
  },
  {
    title: "Search",
    contentType: ContentType.Search,
  },
];
