import {configureStore} from "@reduxjs/toolkit";
import {persistedReducer} from "./rootReducer";
import {persistStore} from "redux-persist";

export const store: any = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)

// export type RootState =  ReturnType<typeof rootReducer>