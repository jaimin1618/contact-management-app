import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ContactActions } from "../store/ContactSlice";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector((state) => state.Contact);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !number) {
      return toast.warning("Kindly Fill All Form Fields");
    }

    const isEmailExists = contacts.find((c) => c.email === email);
    const isNumberExists = contacts.find((c) => c.number === parseInt(number));

    if (isEmailExists) {
      return toast.error("Provided Email Address Already Exists");
    }
    if (isNumberExists) {
      return toast.error("Provided Number Already Exists");
    }

    dispatcher(
      ContactActions.addContact({
        id: contacts[contacts.length - 1].id + 1,
        name,
        email,
        number,
      })
    );

    toast.success("New Contact Added Successfully");
    navigate("/contact-management-app");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 text-center">Add Contact Details</h1>
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

            <div className="form-group">
              <button type="Submit" className="btn btn-block btn-dark w-100">
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
