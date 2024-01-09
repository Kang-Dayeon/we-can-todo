export interface ITodo {
    TodoID?: number,
    content: string,
    completed: number,
    userID: number,
}

export interface ITodoList {
    todoList: ITodo[]
}