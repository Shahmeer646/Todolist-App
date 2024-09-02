import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const saveToLS = () => {
    console.log(todos)
    if(todos.length===1){
      localStorage.clear('todos')
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleSave = (e) => {
    for (let i = 0; i < 3; i++) {
      setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
      setTodo('')
      setTimeout(() => {

      }, 1000);
    }
  }

  const handelEdit = (e, id, item) => {
    setTodo(item)
    let newTodos = todos.filter((item) => {
      return item.id !=id
    })
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let newTodos = [...todos]
    let index = todos.findIndex(item => {
      return item.id === id
    })
    newTodos[index].isComplete = !newTodos[index].isComplete
    setTodos(newTodos)
    saveToLS()

  }



  return (
    <>
      <div className="container">
        <header>
          <div className="logo">TodoList App</div>
        </header>
        <div className="todo-app">
          <div className="search">
            <input  placeholder='Write here your daily todos' type="text" name="search" id="search" value={todo} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
          </div>
          <div className='todos'>
            <span>My Todos</span>
          </div>
          {todos.length === 0 && <div className='todo No-todos'>No Todos to display</div>}
          <div className="todos-list">
            {
              todos.map(item => {
                return (<div key={item.id} className="todo">
                  <div className='content'>
                    <input onClick={handleCheckbox} type="checkbox" name={item.id} id="checkbox" />
                    <span className='item' style={{ textDecorationLine: item.isComplete ? 'line-through' : '' }}>{item.todo}</span>
                  </div>
                  <div className="buttons">
                    <button onClick={(e) => {
                      handelEdit(e, item.id, item.todo)
                    }} className='btn-edit'>Edit</button>
                    <button onClick={(e) => {
                      handleDelete(e, item.id)
                    }} className='btn-delete'>Delete</button>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
