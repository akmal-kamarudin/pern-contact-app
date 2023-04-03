import React from "react";
import { Link } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  add = (e) => {
    e.preventDefault();

    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (this.isValidEmail(this.state.email)) {
      alert("The contact is successfully added.");
    } else {
      alert("Email is invalid");
      return;
    }

    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  render() {
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
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">ADD</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
