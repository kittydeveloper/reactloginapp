const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const db = require('./db');



app.post('/login', (req, res) => {
    const { username, userpassword } = req.body;
    console.log(username,userpassword,"data")
  
    if (!username || !userpassword) {
      return res.status(400).json({ error: 'Username and userpassword are required.' });
    }
    db.query('SELECT * FROM usercreation WHERE username = ? AND userpassword = ?', [username, userpassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
      }
      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
      }
  
      return res.status(200).json({ message: 'Login successful', user: result[0] });
    });
  });

const port = 8000;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
