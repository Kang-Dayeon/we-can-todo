// ** Type **
import {ITodo} from "../../../store/todos/type";
// ** Hook **
import {useAppSelector} from "../../../hooks/TypedUseSelector";
// ** Component **
import TodoItem from "./TodoItem";
import List from "../../../components/List/List";
import NoContent from "./NoContent";

function TodoList(){
    // state
    const todoList = useAppSelector((state) => state.todos.todoList);

    return (
        <>
            {todoList === undefined ?
                <></> :
                <>
                    <List title={'TODO'}>
                        {todoList.length === 0 ?
                            <NoContent/> :
                            <ul>
                                {todoList.map((todo) => (
                                    todo.completed ? '' : <TodoItem {...todo} />
                                ))}
                            </ul>
                        }
                    </List>
                    <List title={'COMPLETED'}>
                    {todoList.length === 0 ?
                        <NoContent/> :
                        <ul>
                            {todoList.map((todo) => (
                                todo.completed ? <TodoItem {...todo} /> : ''
                            ))}
                        </ul>
                    }
                    </List>
                </>
            }
        </>
    );
}

export default TodoList;