import {configureStore} from "@reduxjs/toolkit";
import {persistedReducer, rootReducer} from "./rootReducer";
import {persistStore, PURGE} from "redux-persist";

export const store: any = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
    devTools: true,
})

export const persistor = persistStore(store)

// state type 지정 코드
export type RootState = ReturnType<typeof rootReducer>
// dispatch type 지정 코드
export type AppDispatch = ReturnType<typeof store.dispatch>;