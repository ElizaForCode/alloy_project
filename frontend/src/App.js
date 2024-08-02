import React from 'react'
import Form from './Components/Form/Form'
import './Components/Form/Form.css'
import logo from './Assets/logo_only.png';

const App = () => {
  return (
    <div>
      <div className='intro'>
          <img src={logo} alt="OtterBank Logo"/> 
          <h1>Welcome to OtterBank!</h1>
          <p>Otterly Reliable Banking</p>
      </div>
      <Form />
    </div>
  )
}

export default App
