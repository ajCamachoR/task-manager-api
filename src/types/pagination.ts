import mongoose, { PipelineStage } from "mongoose";

export type PaginationResult<T> = {
  items: T[];
  total: number;
  offset: number;
  limit: number;
};

export type PaginationInput = {
  page?: number;
  limit?: number;
};

export interface Pagination {
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface ListApiResponse {
  data: [];
  pagination: Pagination;
}

export type SortOrder = 1 | -1 | "asc" | "desc";

export type SortInput = {
  field: string;
  order: SortOrder;
};

export type PaginationManagerInput<T> = {
  model: mongoose.Model<T>;
  pipeline: PipelineStage[];
  pagination?: PaginationInput;
  sort?: SortInput;
  search?: string;
  searchFields?: string[];
};
