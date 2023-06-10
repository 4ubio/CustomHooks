import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

export const useTodo = (initialState = []) => {
    
    const init = () => {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            return JSON.parse(localStorage.getItem('todos'))
        }
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const todosCount = (todos) => {
        return todos.length;
    }

    const pendingTodosCount = (todos) => {
        return todos.filter(todo => !todo.done).length;
    }

    const handleNewTodo = (newTodo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: newTodo,
        }
        
        dispatch(action)
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        }

        dispatch(action)
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id,
        }

        dispatch(action)
    }

    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
