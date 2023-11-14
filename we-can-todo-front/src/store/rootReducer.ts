// ** RTK **
import {AnyAction, combineReducers} from "@reduxjs/toolkit";
// ** Redux **
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// ** Type **
import {RootState} from "./store";
// ** Reducer **
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