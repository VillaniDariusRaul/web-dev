const express = require('express');
const path = require('path');
const users = require('./users'); 

const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const foundUser = users.find(u => u.name === username && u.pass === password);

    if (foundUser) {
        const target = foundUser.role === 'admin' ? 'admin.html' : 'users.html';
        res.redirect(`/${target}?name=${foundUser.name}&role=${foundUser.role}`);
    } else {
        res.send('<h2>❌ Wrong credentials</h2><a href="/">Try again</a>');
    }
});

app.get('/admin.html', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/users.html', (req, res) => res.sendFile(path.join(__dirname, 'users.html')));


app.listen(3001, () => {
    console.log('✅ Server running at http://localhost:3001');
});