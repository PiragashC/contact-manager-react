import React, { useEffect, useState } from 'react'
import user from '../images/user.png';
import { Link, useParams } from 'react-router-dom';


const ContactDetail = ({contacts}) => {
    //const { name, email } = props.location.state.contact;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {id} = useParams();
    const contact = contacts.find(contact => (contact.id).toString() === id );

    useEffect(() => {
      if (contact) {
          setName(contact.name);
          setEmail(contact.email);
      }
    },[contact, setName, setEmail])

    return (
      <div className='main'>
        <div className='ui card centered'>
          <div className='image'>
            <img src={user} alt='user' />
          </div>
          <div className='content'>
            <div className='header'>{name}</div>
            <div className='description'>{email}</div>
          </div>
          <div className='center-div'>
            <Link to = "/" >
              <button className='ui button blue center' >
                Back to Contact List
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  

export default ContactDetail;
