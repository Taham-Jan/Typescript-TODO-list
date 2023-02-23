import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { todolist as listModel } from './models/todolistModel';
import Todolist from './components/Todolist';
import styles from './styles/AllNotes.module.css';
import * as List_api from './Routes/todolist';
import AddNewDialog from './components/AddNewDialog';

function App() {
  const [Todo, setTodo] = useState<listModel[]>([]);

  const [showAddNewDialog,setshowAddNewDialog] = useState(false);

  useEffect(() => {
    async function loadList() {
      try {
       const Todo = await List_api.fetchTodoList();
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
      <Button onClick={()=> setshowAddNewDialog(true)}>ADD</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
       
          {
          Todo.map(item => ( 
          <Col  key={item._id} >
            <Todolist list={item} className={styles.note}/>
          </Col> 
          ))}
    
      </Row>
      {showAddNewDialog && <AddNewDialog onDismiss={()=>setshowAddNewDialog(false)}/>}
    </Container>
  );
}

export default App;
