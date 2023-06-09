import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { c_uuid, c_name, c_email } = props.contact;

  return (
    <div className="item">
      <img
        className="ui mini avatar image"
        src={user}
        alt="user"
        style={{ marginBlock: "6px" }}
      />
      <div className="content" style={{ marginBlock: "6px" }}>
        <Link to={`/contact/${c_uuid}`} state={{ contact: props.contact }}>
          <div className="header">{c_name}</div>
          <div>{c_email}</div>
        </Link>
      </div>
      <Link to={`/delete/${c_uuid}`} state={{ contact: props.contact }}>
        <i
          className="large right floated trash alternate outline icon"
          style={{ color: "red", marginTop: "12px", cursor: "pointer" }}
        ></i>
      </Link>
      <Link to={`edit/${c_uuid}`} state={{ contact: props.contact }}>
        <i
          className="large right floated edit alternate outline icon"
          style={{ color: "teal", marginTop: "12px", cursor: "pointer" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
