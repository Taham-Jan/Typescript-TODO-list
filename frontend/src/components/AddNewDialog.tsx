import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
// import  {DateTimePicker, MuiPickersUtilsProvider}  from '@material-ui/pickers';
import DateMomentUtils from '@date-io/moment';
import  {MaterialUiPickersDate}  from "@material-ui/pickers/typings/date";
import moment from "moment";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface AddNewDialogProps {
  onDismiss: () => void,
}

enum TodoStatus {
  Incomplete,
  Completed
}

interface Todo {
  text: string;
  dueDateTime: Date | null;
  status: TodoStatus;
}


const AddNewDialog = ({ onDismiss }: AddNewDialogProps) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(null);
  const [todos, setTodos] = useState<Todo[]>([])
  const addTodo = (text: string, dueDateTime: Date | null) => {
    const newTodo = {
      text: text,
      dueDateTime: dueDateTime,
      status: TodoStatus.Incomplete,
    };
    setTodos([...todos, newTodo]);
    
  };

  console.log(todos)

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(!dueDate)
    {
    addTodo(text,null)
    }
    else{
      addTodo(text, dueDate.toDate());
    }
    // if(oneItem){
    //   addTodo();
    //   setAllItem((ls)=>[...ls,oneItem,])
    //   setOneItem('')
    // }


  }
  const handleDateChange = (date: MaterialUiPickersDate, value?: string | null) => {
    setDueDate(date);
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal show onHide={() => onDismiss()}>
        <Modal.Header closeButton>
          <Modal.Title>Add List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text" placeholder="Enter Your Title"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Your Todo-List</Form.Label>
              <Form.Control
                type="text"
                placeholder='enter'
                value={text}
                onChange={(e) => setText(e.target.value)} />
<br/>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={10}>
      <DateTimePicker
          label="Schedule your Work *(optional)"
          value={dueDate}
          disablePast
          showDaysOutsideCurrentMonth
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>

              <Form.Label onClick={handleSubmit} style={{ background: '#242424', color: 'aliceblue', fontSize: '13px' }}> Click To Add Item To Programs</Form.Label>
              {
                
                todos.map((a,index) => (
                !a.dueDateTime 
                ?<li key={index}>{a.text}</li>
                : (<li key={index}>{a.text +" "+ moment(a.dueDateTime).format('MMM D YYYY, h:mm a')}</li>)
                ))

              }
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default AddNewDialog;