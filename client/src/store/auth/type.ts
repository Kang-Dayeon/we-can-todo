export interface IUser {
    userID?: number,
    username: string,
    name: string,
    isLogin: boolean,
    isRegister?: boolean,
    failLogin?: string
}
