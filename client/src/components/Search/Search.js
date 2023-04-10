import { InputGroup, Form, Button, Row, Divider } from "react-bootstrap";
import { useState } from "react";
import SingleEvent from "../SingleEvent/SingleEvent";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedEvents, setSearchedEvents] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/search?search=${searchInput}`
      );
      const result = await response.json();
      setSearchedEvents(result);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div>
      <InputGroup className="my-3 w-75 mx-auto">
        <Form.Control
          placeholder="Search...."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
      <section>
        {searchedEvents.length ? (
          <>
            <Row className="border border-3 rounded p-5 mx-2 my-5">
            <h3>Search Results</h3>
              {searchedEvents.map((event) => (
                <SingleEvent event={event} key={event.id} />
              ))}
            </Row>
          </>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Search;
