import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BACKEND_URL_PRODUCTION = 'https://ecommerce-app-tysz.onrender.com'
const BACKEND_URL_DEV = 'http://localhost:3012'

export const ecommerceApi = createApi({
    reducerPath:'ecommerceApi',
    baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL_PRODUCTION}),
    endpoints: (builder) => ({
        
        allcategories: builder.query({
            query: () => '/api/product/allCategories',
         }),
        
         userLogin: builder.mutation({
            query: ({body}) => ({
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
         }),

         fetchProduct: builder.query({
            query:({category , p_id}) => ({
                url:`api/product/${category}/${p_id}`,
                method: 'GET'
            })
         }),

         fetchAllProducts: builder.query({
            query:({category}) => ({
                url: `api/product/${category}`,
                method: 'GET'
            })
         }),

         sortProductsBySubcategory: builder.query({
            query:({subCategory}) => ({
                url: `api/sortedBy/${subCategory}`,
                method: 'GET',
            })
         }),

         getTopDeals: builder.query({
            query: () => 'api/product/getTopDeals' 
        })
        
    })
}) 

export const {
              useAllcategoriesQuery,
              useUserLoginMutation, 
              useFetchUserQuery,
              useFetchCartQuery,
              useAddToCartMutation,
              useUpdateCartCountMutation,
              useFetchProductQuery,
              useFetchAllProductsQuery,
              useSortProductsBySubcategoryQuery,
              useGetTopDealsQuery
            
              } = ecommerceApi
