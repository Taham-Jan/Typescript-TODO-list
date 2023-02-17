import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { todolist as listModel } from './models/todolistModel';
import Todolist from './components/Todolist';
import styles from './styles/AllNotes.module.css'

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
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
       
          {
          Todo.map(item => ( 
          <Col  key={item._id} >
            <Todolist list={item} className={styles.note}/>
          </Col> 
          ))}
    
      </Row>
    </Container>
  );
}

export default App;
