import { createSlice } from "@reduxjs/toolkit";

const productReducerSlice = createSlice({
    name: "productReducerSlice",
    initialState: {
        allCategoriesAndSubcategories: [],
        operationList:[],
        renderList:[],
        userLoggedIn:false,
        itemsInCart:0,
        cartAddAlert:false,
        cartUpdationFlag:false,
        currentUser: {}
    },
    reducers: {
        setAllCategoriesAndSubcategories: (state, action) => {
            state.allCategoriesAndSubcategories = action.payload;
        },
        setOperationList:(state , action) => {
            state.operationList = action.payload
        },
        setRenderList:(state , action) => {
            state.renderList = action.payload;
        },
        setUserLoggedIn:(state , action) => {
            state.userLoggedIn = action.payload;
        },
        setItemsInCart:(state , action) => {
            state.itemsInCart = action.payload;
        },
        setCartAddAlert:(state) => {
            const prev = state.cartAddAlert;
            state.cartAddAlert = !prev
        },
        setCartUpdationFlag: (state) => {
            return {
              ...state,
              cartUpdationFlag: !state.cartUpdationFlag,
            };
          },
          setCurrentUser:(state , action) => {
            state.currentUser = action.payload
          }
          
    },
});

export const { 
               setAllCategoriesAndSubcategories,
               setOperationList,
               setRenderList,
               setUserLoggedIn,
               setItemsInCart,
               setCartAddAlert,
               setCartUpdationFlag,
               setCurrentUser
             } = productReducerSlice.actions;

export default productReducerSlice.reducer;
