// ** typesafe-actions **
import { deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;

// 액션 type
export const LOGIN = 'auth/LOGIN';

// 액션 생성 함수
// createAction 사용시 문법
export const login = createStandardAction(LOGIN)<string>();