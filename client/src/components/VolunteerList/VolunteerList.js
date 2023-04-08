import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { RiDeleteBinLine } from "react-icons/ri";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/volunteer-list`)
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

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
            const { id, name, email, date, event } = volunteer;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{date}</td>
                <td>{event}</td>
                <td>
                  <RiDeleteBinLine
                    color="white"
                    size={30}
                    style={{
                      backgroundColor: "red",
                      borderRadius: 5,
                      padding: 3,
                      margin: "auto",
                    }}
                  />
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
