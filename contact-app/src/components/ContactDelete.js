import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactDelete = () => {
  const { removeContactHandler } = useContactsCrud();
  const location = useLocation();
  const { c_uuid } = location.state.contact;

  const deleteContactHandler = (id) => {
    removeContactHandler(id);
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
                onClick={() => deleteContactHandler(c_uuid)}
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
