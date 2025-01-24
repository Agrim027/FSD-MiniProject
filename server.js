const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const csvWriter = createCsvWriter({
    path: 'database.csv',
    header: [
        { id: 'username', title: 'User Name' },
        { id: 'password', title: 'Password' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone No.' },
        { id: 'gender', title: 'Gender' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'languages', title: 'Languages Known' },
        { id: 'address', title: 'Address' }
    ],
    append: true
});

app.post('/submit', (req, res) => {
    const { username, password, email, phone, gender, dob, languages, address } = req.body;
    const languagesKnown = Array.isArray(languages) ? languages.join(', ') : languages;

    const record = {
        username,
        password,
        email,
        phone,
        gender,
        dob,
        languages: languagesKnown,
        address
    };

    csvWriter.writeRecords([record])
        .then(() => {
            res.send('Registration successful!');
        })
        .catch(err => {
            res.status(500).send('Error saving data');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});