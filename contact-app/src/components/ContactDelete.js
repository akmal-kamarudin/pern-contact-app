import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const ContactDelete = (props) => {
  const { id } = props.location.state.contact;

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  return (
    <div id="my-container" className="ui grid middle aligned">
      <div className="row">
        <div className="column">
          <div className="ui text container segment center aligned">
            <h3>Are you sure you want to DELETE the contact?</h3>
            <Link to="/">
              <button
                className="ui button red"
                onClick={() => deleteContactHandler(id)}
              >
                DELETE
              </button>
            </Link>
            <Link to="/">
              <button className="ui button blue">CANCEL</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDelete;
