import { Card } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { todolist as listModel } from '../models/todolistModel';


interface listProps {
  list: listModel,
};

const Todolist = ({ list }: listProps) => {

  const {
    _id,
    title,
    todo,
    createdAt,
    updatedAt,
  } = list;

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/todolisticon.png" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">

            {
              todo?.map((item,_id)=>{
                return <ListGroup.Item key={_id}>{item}</ListGroup.Item>
              }
)            }

        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )

}
export default Todolist;
