export interface ISeedResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface PaginatedApiResponse<T> {
  status_code: number;
  message: string;
  data: {
    count: number;
    next: boolean | null;
    previous: boolean | null;
    results: T[];
  };
}
