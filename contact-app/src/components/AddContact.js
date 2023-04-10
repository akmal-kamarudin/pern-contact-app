import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { addContactHandler } = useContactsCrud();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const add = (e) => {
    e.preventDefault();

    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (isValidEmail(email)) {
      alert("The contact is successfully added.");
    } else {
      alert("Email is invalid");
      return;
    }

    addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>
        Add Contact
        <Link to="/">
          <button className="ui button orange right floated">
            All Contact List
          </button>
        </Link>
      </h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">ADD</button>
      </form>
    </div>
  );
};

export default AddContact;
