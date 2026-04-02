import { baseApi } from "@/api/baseApi"
import type {
  GetItemsParams,
  GetItemsResponse,
  Item,
  ItemUpdateIn,
} from "@/api/types"

export const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<GetItemsResponse, GetItemsParams | void>({
      query: (params) => ({
        url: "/items",
        params: params
          ? {
              q: params.q,
              limit: params.limit,
              skip: params.skip,
              needsRevision: params.needsRevision ? "true" : undefined,
              categories: params.categories?.join(","),
              sortColumn: params.sortColumn,
              sortDirection: params.sortDirection,
            }
          : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Items", id: "LIST" },
              ...result.items.map((item) => ({
                type: "Items" as const,
                id: item.id,
              })),
            ]
          : [{ type: "Items", id: "LIST" }],
    }),

    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Items", id }],
    }),

    updateItem: builder.mutation<Item, { id: number; data: ItemUpdateIn }>({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Items", id },
        { type: "Items", id: "LIST" },
      ],
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery, useUpdateItemMutation } =
  itemsApi
