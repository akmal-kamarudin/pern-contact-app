import React, { useRef, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = (props) => {
  const { contacts, retrieveContacts } = useContactsCrud();
  const inputEl = useRef("");

  useEffect(() => {
    retrieveContacts();
  }, []);

  const renderContactList = contacts.map((contact) => {
    return <ContactCard contact={contact} key={contact.id}></ContactCard>;
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div id="search-container" className="ui search">
        <div className="ui icon input">
          <input
            id="search-bar"
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No contacts are available"}
      </div>
    </div>
  );
};

export default ContactList;
