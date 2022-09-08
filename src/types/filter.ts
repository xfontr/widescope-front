export type Filters = "all" | "byAuthor" | "byTechnology";

export interface Filter {
  filter: Filters;
  byAuthor: {
    id: string;
    name: string;
  };
  byTechnology: string;
}
