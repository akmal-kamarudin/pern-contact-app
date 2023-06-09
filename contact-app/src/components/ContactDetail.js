import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user_dtl.png";

const ContactDetail = () => {
  const location = useLocation();
  const { c_name, c_email } = location.state.contact;
  return (
    <div className="main">
      <h2>
        Contact Details
        <Link to="/">
          <button className="ui button orange right floated">All Contact List</button>
        </Link>
      </h2>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{c_name}</div>
          <div className="description">{c_email}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
