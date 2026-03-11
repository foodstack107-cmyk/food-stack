/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { Product } from '@/lib/endpoints/product';
import { callApi } from '@/lib/http/'; // or wherever `callApi` is located

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (payload: any) =>
      callApi({
        uriEndPoint: Product.createProduct.v1,
        body: payload,
        multipart: true,
      }),
  });
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () =>
      callApi({
        uriEndPoint: Product.getAllProducts.v1,
      }).then((res: any) => res.data), // assuming `res.data` contains the product array
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
};

// export const useDeleteProduct = () =>
//   useMutation({
//     mutationFn: (payload) => deleteProduct(payload),
//   });
export function useUpdateProduct() {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await callApi({
        uriEndPoint: Product.updateProduct.v1,
        pathParams: { id },
        body: payload,
        multipart: true,
      });
    },
  });
}

export function useDeleteProduct() {
  return useMutation({
    mutationFn: async (id: string) => {
      return await callApi({
        uriEndPoint: Product.deleteProduct.v1,
        pathParams: { id },
      });
    },
  });
}

export function useGetCategoryTypePercentage() {
  return useQuery({
    queryKey: ['categoryTypePercentage'],
    queryFn: () =>
      callApi({
        uriEndPoint: Product.getCategoryTypePercentage.v1,
      }).then((res: any) => res.data), // assuming `res.data` contains the category type percentage data
    staleTime: 1000 * 60 * 5, // optional: cache for 5 mins
  });
}
