import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

const Form = ()=>{
  const  [todo, setTodo]= useState("");
  const  [todos, setTodos]= useState([]);

   useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const savetoLocal= (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

 const handleEdit = (e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    savetoLocal()

 }

 const handleDelet = (e,id)=>{
 let newTodos= todos.filter(item=>{
  return item.id!==id
 })
 setTodos(newTodos)
 savetoLocal()
 }

 const handleAdd = ()=>{
  if(todo === ""){
    return ""
  }
  setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
  setTodo("")
  savetoLocal()
 }

 const handleChange = (e)=>{
  setTodo(e.target.value)
 }


 const handleClick= (e)=>{
  let id= e.target.name;
  let index=todos.findIndex((item)=> {
    return item.id===id
 })
 let newTodos=[...todos];
 newTodos[index].isCompleted = !newTodos[index].isCompleted;
 setTodos(newTodos)
 savetoLocal()
}
return(
<div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
       <div className="addtodo">
        <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} className= " bg-white border-2 w-1/2" type='text' />
        <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-md mx-6'>Save</button>
        
       </div>
          <h2 className='text-xg font-bold'>Your Todo App</h2>
          <div className="todos">
            {todos.length===0 && <div className="m-5">Your Todo List is Empty</div>}
            {todos.map(item=>{
            return <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
                <div className="flex gap-5">
              <input onChange={handleClick} name={item.id} type='checkbox' value={item.isCompleted}  id=''  />
              <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>handleDelet(e,item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 rounded-md mx-1'>Delete</button>
              </div>
            </div>
            })}
          </div>

        </div>
)
}

export default Form