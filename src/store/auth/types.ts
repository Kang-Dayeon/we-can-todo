// ** typesafe-actions **
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AuthAction = ActionType<typeof actions>;

export type User = {
    id: number;
    name: string;
    loginId: string;
    password: number;
}

export type UserType = User[]
