import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { todolist as listModel } from '../models/todolistModel';
import styles from '../styles/Todo.module.css'
import { formatDate } from './formatDate';


interface listProps {
  list: listModel,
  className?: string,
};

const Todolist = ({ list , className}: listProps) => {

  const {
    _id,
    title,
    todo,
    createdAt,
    updatedAt,
  } = list;
let createdUpdatedDate: string;
if (updatedAt>createdAt)
{
  createdUpdatedDate = "Updated: " + formatDate(updatedAt);
}
else{
  createdUpdatedDate = "Created: " + formatDate(createdAt);
}

  return (
    <div>
      <Card className={`${styles.cardlist} ${className}`}>
        <Card.Img variant="top" src="/todolisticon.png" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Following is the todo list.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" id={styles.listgroup}>
            {
              todo?.map((item,_id)=>{
                return <ListGroup.Item key={_id} className={styles.listitem}>{item}</ListGroup.Item>
              })
            }

        </ListGroup>
        <Card.Footer>
          {createdUpdatedDate}
        <br></br>
          <Card.Link href="#">Click To Expand</Card.Link>
        </Card.Footer>
      </Card>
    </div>
  )

}
export default Todolist;
