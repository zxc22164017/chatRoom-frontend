import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDetectLogin } from "../../hooks/useDetectLogin";
import axios from "axios";
import { SERVER } from "../../config";

const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER}/upload`,
    prepareHeaders: (headers) => {
      const token = useDetectLogin();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints(builder) {
    return {
      uploadImg: builder.mutation({
        async queryFn(
          { file, type, id, tokenFromReg },
          baseQueryApi,
          extraOptions,
          baseQuery
        ) {
          const token = useDetectLogin() || tokenFromReg;
          let presignedUrl;
          let key;
          try {
            if (token) {
              const { data } = await baseQuery({
                url: "/presign",
                method: "GET",
              });
              presignedUrl = data.presignedUrl;
              key = data.key;
            }

            const res = await axios.put(presignedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
            });

            return { data: key, error: null };
          } catch (error) {
            return { error: error };
          }
        },
      }),
    };
  },
});

export const { useUploadImgMutation } = uploadApi;
export { uploadApi };
