import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaArchive, FaEdit } from "react-icons/fa";
import { ContactActions } from "../store/ContactSlice";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state.Contact);
  const dispatcher = useDispatch();

  const deleteContactItem = (id) => {
    dispatcher(ContactActions.removeContact(id));
    toast.success("Contact Item Deleted Succcessfully");
  };

  const renderContacts = () => {
    return contacts.map((contact) => (
      <tr key={contact.id}>
        <td>{contact.id + 1}</td>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
        <td>{contact.number}</td>
        <td>
          <Link
            to={`/edit/${contact.id}`}
            className="btn btn-small btn-primary m-1"
          >
            {<FaEdit />}
          </Link>
          <button
            className="btn btn-small btn-danger m-1"
            type="button"
            onClick={() => deleteContactItem(contact.id)}
          >
            {<FaArchive />}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-right my-5">
          <Link to="/add" className="btn btn-success">
            Add Contact
          </Link>
        </div>
        <div className="col-md-6 mx-auto">
          <h1>Contact Management Application</h1>
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{renderContacts()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
