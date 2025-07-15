/**
 * Generic Paginated Response by Poke API
 */
export interface PokePaginatedResponse<T> {
  count: number;    // total number of items
  previous: string; // url for previous page
  next: string;     // url for next page
  results: T[];     // results
};

/**
 * Generic external resource used by Poke API to refer any kind of item.
 */
export interface ExternalResource {
    name: string; // name of element
    url: string;  // url to call to get the info related to this element
};

export interface Indexable {
  [key: string]: any
};