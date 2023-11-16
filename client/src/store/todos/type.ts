export interface ITodo {
    id: number;
    content: string;
    completed: number;
}

export interface ITodoList {
    todoList: ITodo[]
}