import { useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    fetch(`https://volunteer-network-fsn-server.onrender.com/volunteer-list`)
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
 const handleDelete = (id) => {
   fetch(`https://volunteer-network-fsn-server.onrender.com/delete-registration`, {
     method: "DELETE", 
     headers: {"Content-type":"application/json"},
     body: JSON.stringify({id})
   })
   .then(res => res.json())
   .then(data => {
     console.log(data);
     alert("Deleted");
   })
   .catch(error => alert(error.message));
 };

  return (
    <div className="bg-secondary bg-opacity-10">
      <h4 className="bg-white p-3">Volunteer List</h4>
      <section className="bg-white m-3 p-3 rounded">
      <Table hover responsive >
        <thead className="bg-secondary bg-opacity-10 text-secondary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => {
            const { _id, name, email, date, event } = volunteer;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td>{event}</td>
                <td>
                <Button variant="danger">
                  <RiDeleteBinLine size={24} onClick = { () => handleDelete(_id) }
                  />
                </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </section>
    </div>
  );
};

export default VolunteerList;
