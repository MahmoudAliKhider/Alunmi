export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export class PaginationResult<T> {
  result: T | null = null;
  pagination: Pagination | null =null;
}