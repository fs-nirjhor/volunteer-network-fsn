import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleEvent = ({ event }) => {
  const {img, title, id} = event;
  return (
    <Col xs={12} md={3} className="p-2">
      <Card className="h-100">
        <Card.Img variant="top" src={img} />
        <Card.Body className="p-0">
          <Card.Text className="btn btn-primary w-100 h-100" as={Link} to={`/register/${id}`}
            >{title}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleEvent;
