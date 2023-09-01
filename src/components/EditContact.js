import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { toast } from "react-toastify";
import { ContactActions } from "../store/ContactSlice";

const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const { id } = useParams();
  console.log(id);
  const contacts = useSelector((state) => state.Contact);
  console.log(contacts);

  const contact = contacts.find((c) => c.id === id);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setNumber(contact.number);
    }
  }, [contact]);

  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !number) {
      toast.warn("Kindly Fill All Form Fields.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    const isEmailExists = contacts.find(
      (c) => c.email === email && c.id !== id
    );
    const isNumberExists = contacts.find(
      (c) => c.number === number && c.id !== id
    );

    if (isEmailExists) {
      toast.error("Provided Email Address Already Exists.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }
    if (isNumberExists) {
      toast.error("Provided Number Already Exists.", {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: 3000,
      });

      return;
    }

    dispatcher(
      ContactActions.saveContact({
        id: contact.id,
        name,
        email,
        number,
      })
    );

    toast.success("Contact Updated Successfully!", {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
    });
    navigate("/");
  };

  return (
    <div className="container">
      {contact ? (
        <div className="row">
          <h1 className="display-3 text-center mt-5">
            Editing Contact ID {contact.name}
          </h1>
          <div className="col-md-6 shadow mx-auto p-5 m-5">
            <form onSubmit={formSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="form-control my-2"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group text-center">
                <button
                  type="Submit"
                  className="btn btn-block btn-primary w-25 mx-2"
                >
                  Save
                </button>

                <Link to="/" className="btn btn-block btn-danger w-25 mx-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1>No Contact Found</h1>
      )}
    </div>
  );
};

export default EditContact;
