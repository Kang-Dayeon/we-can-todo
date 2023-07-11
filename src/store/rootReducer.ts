import {AnyAction, combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {RootState} from "./store";
import todoReducer from './todos/todoSlice';
import authReducer from './auth/authSlice';

export const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
})

export const persistedReducer = persistReducer<RootState, AnyAction>(
    {
        key: 'root',
        storage
    },
    rootReducer,
)