import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("LOCAL_STORAGE_KEY"))??[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setsearchResults] = useState("");

  /* const retrieveContacts = async() => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const addContactHandler = async(contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data])
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };
 */
  const addContactHandler = (contact) => {
    const newContact = {
      id: uuid(),
      ...contact,
    };
    setContacts([...contacts, newContact])
  };
  
  const updateContactHandler = (name, email, id) => {
    const newContact = {
      id: id,
      name: name,
      email: email
    };
    const filterdContact = contacts.filter(contact => contact.id !== id);
    const newContacts = [...filterdContact, newContact];
    setContacts(newContacts);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setsearchResults(newContactList);
    }
    else {
      setsearchResults(contacts);
    }
  };

  /* useEffect(() =>{
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if (retriveContacts)setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []); */

  
  useEffect(() =>{
    localStorage.setItem("LOCAL_STORAGE_KEY", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}/>} />
          <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path='/edit/:id' element={<EditContact contacts = {contacts} updateContactHandler={updateContactHandler} />} />
          <Route path='/contact/:id' element={<ContactDetail contacts ={contacts}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
