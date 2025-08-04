import { PipelineStage, Model } from "mongoose";
import { PaginationManagerInput } from "../types/pagination";

export class PaginationManager<T> {
  static async paginate<T>(input: PaginationManagerInput<T>) {
    const {
      model,
      pipeline = [],
      pagination,
      sort,
      search,
      searchFields = [],
    } = input;

    const page = pagination?.page ?? 0;
    const limit = pagination?.limit ?? 10;
    const skip = page * limit;

    const sortField = sort?.field ?? "createdAt";
    const sortOrder =
      sort?.order !== undefined && ["asc", 1].includes(sort.order) ? 1 : -1;

    const sortStage: PipelineStage = {
      $sort: { [sortField]: sortOrder },
    };

    const searchStage: PipelineStage | null =
      search && searchFields.length
        ? {
            $match: {
              $or: searchFields.map((field) => ({
                [field]: { $regex: search, $options: "i" },
              })),
            },
          }
        : null;

    const fullPipeline: PipelineStage[] = [
      ...pipeline,
      ...(searchStage ? [searchStage] : []),
      sortStage,
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const results = await model.aggregate(fullPipeline);
    const data = results?.[0]?.data ?? [];
    const total = results?.[0]?.totalCount?.[0]?.count ?? 0;

    return {
      data,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    };
  }
}
