import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = ({contacts, updateContactHandler}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const contact = contacts.find(contact => (contact.id).toString() === id );
  
  useEffect(() => {
    if (contact) {
        setName(contact.name);
        setEmail(contact.email);
    }
  },[contact, setName, setEmail])
  

  /*useEffect(() => {
    const { id, name, email } = props.location.state.contact;
    setId(id);
    setName(name);
    setEmail(email);
  }, [props.location.state.contact]);*/

  const update = (e) => {
    e.preventDefault();
    if(!name || !email){
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler(name,email, contact.id);
    setName("");
    setEmail("");
    navigate('/');
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact
