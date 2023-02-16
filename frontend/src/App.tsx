import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import { todolist as listModel } from './models/todolistModel';
import Todolist from './components/Todolist';

function App() {
  const [Todo, setTodo] = useState<listModel[]>([]);

  useEffect(() => {
    async function loadList() {
      try {
        const response = await fetch("/api/todolist");
        const Todo = await response.json();
        setTodo(Todo)

      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadList();
  },[]);

  return (
    <>{
      Todo.map(item => <Todolist list={item} key={item._id}/>)
    }</>
  );
}

export default App;
