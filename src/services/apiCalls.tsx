// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseType } from "../types/ResponseType";
import { Captions } from "../types/Caption";
import FormData from "form-data";
// Define a service using a base URL and expected endpoints
export const apiCalls = createApi({
  reducerPath: "apiCalls",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["captions"],
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createCaption: builder.mutation<ResponseType<Captions>, any>({
      query: (file) => {
        console.log("data being seing in rtk ", file);
        const data = new FormData();
        data.append("image", file);
        return {
          url: "/captionsService/api/v1/caption",
          method: "POST",
          body: data,
          formData: true,
        };
      },
      invalidatesTags: ["captions"],
    }),
    getCaption: builder.query<ResponseType<Captions>, number>({
      query: (id) => `/captionsService/api/v1/caption/${id}`,
      providesTags: ["captions"],
    }),
    getAllCaptions: builder.query<ResponseType<Captions[]>, void>({
      query: () => `/captionsService/api/v1/caption/`,
      providesTags: ["captions"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createDescription: builder.mutation<ResponseType<Captions>, any>({
      query: (data) => ({
        url: "/descriptionsService/api/v1/descriptions",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["captions"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateCaptionMutation,
  useGetCaptionQuery,
  useCreateDescriptionMutation,
  useGetAllCaptionsQuery,
} = apiCalls;
