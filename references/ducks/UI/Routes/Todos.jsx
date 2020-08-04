import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddTodo from '../Components/AddTodo'
import { useFirestoreConnect } from 'react-redux-firebase'
import ToDoItem from '../Components/TodoItem'
import { increment } from '../../counterSlice'

const Todos = () => {
  const { displayName, uid } = useSelector(state => state.firebase.auth)
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    storeAs: 'todos'
  })
  const todos = useSelector(state => state.firestore.data.todos)
  const add = () => {
    console.log('add')
    dispatch(increment)
  }
  console.log(todos)
  return (
    <div>
      <h3>Hello {displayName}</h3>
      <h4>Todos</h4>
      <AddTodo />
      <ul
        style={{
          listStyleType: 'none'
        }}
      >
        {todos &&
          Object.values(todos).map(todo => (
            <li>
              <ToDoItem
                key={todo.title}
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
              />
            </li>
          ))}
      </ul>
      <div>{counter}</div>
      <button onClick={add}>increment</button>
    </div>
  )
}

export default Todos
