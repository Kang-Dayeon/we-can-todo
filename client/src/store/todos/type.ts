export interface ITodo {
    id?: number,
    content: string,
    completed: number,
    userID: number,
}

export interface ITodoList {
    todoList: ITodo[]
}