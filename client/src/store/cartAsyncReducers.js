import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ecommerceApi = createApi({
    reducerPath:'ecommerceApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3012'}),
    endpoints: (builder) => ({
        
        allcategories: builder.query({
            query: () => '/api/product/allCategories',
         }),
        
         userLogin: builder.mutation({
            query: (body) => ({
                url:'/api/user/userLogin',
                method: 'POST',
                body,
            })
         }),

         fetchUser: builder.query({
            query: (token) => ({
                url: '/api/user/fetchUser',
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
         }),

         fetchCart: builder.query({
            query:({token , body}) => ({
                url:`/api/cart/fetchCartDetails`,
                headers:{
                    authorization: `Bearer ${token}`
                },
                method:'POST',
                body
            })
         }),

         addToCart:builder.mutation({
            query:({token , body}) => ({
                url: `/api/cart/addToCart`,
                headers:{
                    authorization: `Bearer ${token}`
                },
                method: 'POST',
                body
            })
         }),

         updateCartCount: builder.mutation({
            query:({token , body}) => ({
                url:'api/cart/updateCartCount',
                headers:{
                    authorization: `Bearer ${token}`
                },
                method: 'PUT',
                body
            })
         })
    })
}) 

export const {
              useAllcategoriesQuery,
              useUserLoginMutation, 
              useFetchUserQuery,
              useFetchCartQuery,
              useAddToCartMutation,
              useUpdateCartCountMutation
              
              } = ecommerceApi
