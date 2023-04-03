import React from "react";
import { Link } from "react-router-dom";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }

  isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  update = (e) => {
    e.preventDefault();

    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    if (this.isValidEmail(this.state.email)) {
      alert("The contact is successfully updated.");
    } else {
      alert("Email is invalid");
      return;
    }

    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  render() {
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
        <form className="ui form" onSubmit={this.update}>
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
          <button className="ui button teal">UPDATE</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
