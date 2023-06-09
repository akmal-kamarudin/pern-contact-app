import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

export function ContacstCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    try {
      const response = await api.get("/contacts");
      const jsonData = await response.data;
      console.log(jsonData);
      if (jsonData) setContacts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addContactHandler = async (contact) => {
    try {
      const request = { id: uuid(), ...contact };
      const response = await api.post("/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: request,
      });
      const jsonData = await response.data.rows[0];
      console.log(jsonData);
      setContacts([...contacts, jsonData]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateContactHandler = async (contact) => {
    try {
      const { c_uuid, ...body } = contact;
      const response = await api.put(`/contacts/${c_uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: body,
      });

      const jsonData = await response.data.rows[0];
      console.log(jsonData);
      setContacts(
        contacts.map((contact) => {
          return contact.c_uuid === c_uuid ? { ...jsonData } : contact;
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
    } catch (err) {
      console.error(err.message);
    }

    const newContactList = contacts.filter((contact) => {
      return contact.c_uuid !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        const { id, ...rest } = contact;
        return Object.values(rest)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contacts,
    searchTerm,
    searchResults,
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler,
  };

  return (
    <contactsCrudContext.Provider value={value}>{children}</contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
