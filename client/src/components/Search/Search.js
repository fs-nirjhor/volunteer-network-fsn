import { InputGroup, Form, Button } from "react-bootstrap";

const Search = () => {
return (
  <div>
    <InputGroup className="my-3 w-75 mx-auto">
        <Form.Control
          placeholder="Search...."
        />
        <Button variant="primary">
          Search
        </Button>
      </InputGroup>
  </div>
);
};

export default Search;