const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const twilio = require('twilio');
const cors = require('cors'); // Add this line

const app = express();
app.use(cors()); // Add this line
app.use(bodyParser.json());

// Replace these with your Twilio credentials
const accountSid = 'AC72f0c702ff207654b2f9d6b540957996';
const authToken = '5852b6a14fd30895f9a004b38f063274';
const client = new twilio(accountSid, authToken);

function sendSMS() {
    client.messages.create({
      body: 'Hi surya from Rajamundhry, girls are waiting for you',
      to: '+91 8712171492', // Replace with your phone number
      from: '+18573494226' // Replace with your Twilio number
    }).then(message => console.log('SMS sent:', message.sid))
      .catch(error => console.error('Error sending SMS:', error)); // Add this line
  }
  
  // Call sendSMS() immediately for testing
  sendSMS();

  app.post('/schedule-sms', (req, res) => {
    const phone = req.body.phone; // Get the phone number
    const dateTime = new Date(req.body.date);
    schedule.scheduleJob(dateTime, function() {
      client.messages.create({
        body: 'Your scheduled SMS is here!',
        to: phone, // Use the provided phone number
        from: '+0987654321' // Your Twilio number
      }).then(message => console.log('SMS sent:', message.sid))
        .catch(error => console.error('Error sending SMS:', error));
    });
    res.send('SMS scheduled!');
  });

app.listen(3000, () => console.log('Server running on http://localhost:3000'));