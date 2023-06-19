import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = ({contacts, getContactId, term, searchKeyword}) => {
    const inputE1 = useRef("");
    const deleteContactHandler = (id) => {
        getContactId(id);
    };

    const renderContactList = contacts.map((contact)=>{
        return(
           <ContactCard key ={contact.id} contact={contact} clickHandler={deleteContactHandler}/>
        );
        
    });

    const getSearchTerm = () => {
      searchKeyword(inputE1.current.value);
    };
  return (
    <div className="main">
      <h2>
        Contact List
      </h2>
      <Link to="/add">
        <button className='ui button blue'>Add Contact</button>
      </Link>
      <div className='gap'>
        <div className='ui search'>
          <div className='ui icon input'>
            <input ref={inputE1} type='text' placeholder='Search Contacts' className='prompt' value={term} onChange={getSearchTerm}/>
            <i className='search icon'></i>
          </div>
        </div>
      </div>
      
      <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contacts available"}</div>
    </div>
  );
};

export default ContactList