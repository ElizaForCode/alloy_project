const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config()
const endpoint = 'https://sandbox.alloy.co/v1/evaluations'
const workflowToken = process.env.WORKFLOW_TOKEN
const workflowSecret = process.env.WORKFLOW_SECRET
const credentials = Buffer.from(`${workflowToken}:${workflowSecret}`).toString('base64');

const app = express ();
app.use(bodyParser.json());
app.use(cors());

app.post('/submit', async (req, res) => {

try {
    console.log('Received form data:', req.body);

    const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        country,
        ssn,
        dob,
    } = req.body;

   // if (!firstName || !lastName || !addressLine1 || !city || !state || !zip || !country || !ssn || !dob) {
     //   return res.status(400).json({ message: 'Missing required fields' });
   // }
    const payload = {
        name_first: firstName,
        name_last: lastName,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        address_city: city,
        address_state: state,
        address_postal_code: zip,
        address_country_code: country,
        document_ssn: ssn,
        birth_date: dob,
    }

 //   console.log('Payload:', JSON.stringify(payload, null, 2));

    const submission = await axios.post(endpoint, payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`
    }})
    
    console.log('Response data:', submission.data);

    if (submission.data.summary && submission.data.summary.outcome === 'Approved') {
        res.status(200).json({message: '🎉 Success! 🎉<br><br>Your application has been approved.<br>We are otterly delighted to have you!'});
    }
    else if (submission.data.summary && submission.data.summary.outcome === 'Manual Review') {
        res.status(200).json({message: 'Thank you for submitting your application!<br>Please float patiently while our otters do their due diligence.'});
    }
    else if (submission.data.summary && submission.data.summary.outcome === 'Denied') {
        res.status(200).json({message: 'Sadly your application was not successful at this time.<br>You otter try again in the future!'});
    }
    else {
        res.status(400).json({message: 'There seems to be an error.'})
    }
}
catch(error) {
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});


  


app.listen(5000, () => {
    console.log('Server running on Port 5000')
})