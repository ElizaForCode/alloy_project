import React, {useState} from 'react'
import axios from 'axios'

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

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData ({ ...formData, [name]: value });
    }

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
          setError('');
        } catch (error) {
          console.log ('Error:', error)}
      };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        
        <div>
        <h3>Address</h3>
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
        </div>

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
         
         <input 
        type='Date'
        name='dob'
        placeholder='Date of Birth (YYYY-MM-DD)'
        value={formData.dob}
        onChange={handleChange}
        required 
        pattern='\d{4}-\d{2}-\d{2}'/>
        
        <button type='submit'>Apply!</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}

export default Form
