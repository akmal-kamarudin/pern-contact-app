import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = () => {
  const { updateContactHandler } = useContactsCrud();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email } = location.state.contact;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const update = (e) => {
    e.preventDefault();

    if (newName === "" || newEmail === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (isValidEmail(newEmail)) {
      alert("The contact is successfully updated.");
    } else {
      alert("Email is invalid");
      return;
    }

    updateContactHandler({ id, name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>
        Edit Contact
        <Link to="/">
          <button className="ui button orange right floated">
            All Contact List
          </button>
        </Link>
      </h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button className="ui button teal">UPDATE</button>
      </form>
    </div>
  );
};

export default EditContact;
