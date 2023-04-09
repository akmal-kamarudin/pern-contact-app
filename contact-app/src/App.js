import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
// import api from "./api/contacts";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import ContactDelete from "./components/ContactDelete";
import EditContact from "./components/EditContact";
import { ContacstCrudContextProvider } from "./context/ContactsCrudContext";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const retrieveContacts = async () => {
  //   const response = await api.get("/contacts");
  //   return response.data;
  // };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // useEffect(() => {
  //   const getAllContacts = async () => {
  //     const allContacts = await retrieveContacts();
  //     if (allContacts) setContacts(allContacts);
  //   };

  //   getAllContacts();
  // }, []);

  return (
    <>
      <Router>
        <Header />
        <div className="ui container">
          <ContacstCrudContextProvider>
            <Routes>
              <Route
                path="/"
                exact
                element={<ContactList />}
                // render={(props) => (
                //   <ContactList
                //     {...props}
                //     contacts={searchTerm.length < 1 ? contacts : searchResults}
                //     term={searchTerm}
                //     searchKeyword={searchHandler}
                //   />
                // )}
              />
              <Route
                path="/add"
                element={<AddContact />}
                // render={(props) => (
                //   <AddContact {...props} addContactHandler={addContactHandler} />
                // )}
              />
              <Route
                path="/edit"
                element={<EditContact />}
                // render={(props) => (
                //   <EditContact
                //     {...props}
                //     updateContactHandler={updateContactHandler}
                //   />
                // )}
              />
              <Route path="/contact/:id" element={ContactDetail} />
              <Route
                path="/delete/:id"
                element={<ContactDelete />}
                // render={(props) => (
                //   <ContactDelete {...props} getContactId={removeContactHandler} />
                // )}
              />
            </Routes>
          </ContacstCrudContextProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
