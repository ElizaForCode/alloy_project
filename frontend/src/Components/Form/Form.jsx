import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import MessageModal from './MessageModal';


// Calling the form fields to create the form data
const Form = () => {

    const [formData, setFormData] = useState ({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        ssn: '',
        dob: '',
    })
//Handling the API response message
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

//Handling the setting of field values
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData ({ ...formData, [name]: value });
    }
//Handling the submission to the backend and returning the message to the frontend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const submission = await axios.post('http://localhost:5000/submit',
            formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }  
          );
          setMessage(submission.data.message);
          setIsSuccess(true);
          setError('');
        } catch (error) {
          setError('An error occurred while submitting the form. Please try again.');
          setIsSuccess(false);
          setMessage('');
      }
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };
      

// Form HTML and outcome message
  return (
  <div className='container'>  

    <div className='formBox'>
      <form onSubmit={handleSubmit}>
        <h2>Apply Now!</h2>
        <h4>Personal details</h4>
        <input 
        type='text'
        name='firstName'
        placeholder='First Name'
        value={formData.firstName}
        onChange={handleChange}
        required />
        
        <input 
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={formData.lastName}
        onChange={handleChange}
        required />
        
        <input 
        type='Date'
        name='dob'
        placeholder='Date of Birth (YYYY-MM-DD)'
        value={formData.dob}
        onChange={handleChange}
        required 
        pattern='\d{4}-\d{2}-\d{2}'/>

        <input 
        type='number'
        maxLength='9'
        name='ssn'
        placeholder='SSN (9 digits)'
        value={formData.ssn}
        onChange={handleChange}
        required />
         
        <input 
        type='email'
        name='email'
        placeholder='Email Address'
        value={formData.email}
        onChange={handleChange}
        required />
         
        <h4>Address </h4>
        <input 
        type='text'
        name='addressLine1'
        placeholder='Address Line 1'
        value={formData.addressLine1}
        onChange={handleChange}
        required />
        
        <input 
        type='text'
        name='addressLine2'
        placeholder='Address Line 2'
        value={formData.addressLine2}
        onChange={handleChange}
        required />
        
        <input 
        type='text'
        name='city'
        placeholder='City'
        value={formData.city}
        onChange={handleChange}
        required />
        
        <input 
        type='text'
        maxLength='2'
        name='state'
        placeholder='State'
        value={formData.state}
        onChange={handleChange}
        required />
        
        <input 
        type='text'
        name='zip'
        placeholder='ZIP'
        value={formData.zip}
        onChange={handleChange}
        required />
         
        <input 
        type='text'
        name='country'
        placeholder='US'
        value={formData.country}
        onChange={handleChange}
        readOnly />

        
        <button type='submit'>Apply!</button>
      </form>
      <MessageModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    message={isSuccess ? message : error}
                    isSuccess={isSuccess}
      />

    </div>
  </div>
  )
}

export default Form
