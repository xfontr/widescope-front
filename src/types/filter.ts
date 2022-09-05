export type Filters = "all" | "byAuthor";

export interface Filter {
  filter: Filters;
  byAuthor: string;
}
