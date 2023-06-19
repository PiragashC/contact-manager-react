import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddContact = ({addContactHandler}) => {
  const [contact, setContact] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact(values => ({...values, [name]: value}))
  };
  const add = (e) =>{
    e.preventDefault();
    if(!contact.name || !contact.email){
      alert("All the fields are mandatory!");
      return;
    }
    addContactHandler(contact);
    setContact({name:"", email:""});
    navigate('/');
  }
  

  return (
    <div className='ui main'>
        <h2>Add Contact</h2>
        <form className='ui form' onSubmit={add}>
            <div className='field'>
                <label>Name</label>
                <input type='text' name='name' placeholder='Name' value={contact.name} onChange={handleChange}/>
            </div>
            <div className='field'>
                <label>Email</label>
                <input type='text' name='email' placeholder='Email' value={contact.email} onChange={handleChange}/>
            </div>
            <button className='ui button blue'>Add</button>
        </form>
    </div>
  )
}

export default AddContact