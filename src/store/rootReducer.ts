import {AnyAction, combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './todos/todoSlice';
import authReducer from './auth/authSlice';

export const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

export const persistedReducer = persistReducer<RootReducer, AnyAction>(
    {
        key: 'root',
        storage
    },
    rootReducer,
)