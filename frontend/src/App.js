import React from 'react'
import Form from './Components/Form/Form'
import './Components/Form/Form.css'

const App = () => {
  return (
    <div>
      <div className='intro'>
          <h1>Welcome to OtterBank!</h1>
          <p>We are otterly delighted to have you!</p>
      </div>
      <Form />
    </div>
  )
}

export default App
