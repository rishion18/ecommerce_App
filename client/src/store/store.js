import {configureStore} from '@reduxjs/toolkit'
import productReducers from './productReducers'
import { ecommerceApi } from './cartAsyncReducers'
import { setupListeners } from '@reduxjs/toolkit/query';

 const store = configureStore({
    reducer: {
    products: productReducers,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,    
    
},
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware()

.concat(ecommerceApi.middleware),
});

setupListeners(store.dispatch)

  export default store
