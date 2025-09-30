const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];
// for testing
app.resetUsers = () => {
    users = [];
};
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email){
        error = res.status(400).json({
            error: 'Requires both name and email'
        });
        return error;
    }

    const newUser = {
        id: uuidv4(),
        name, 
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log('GET /users/:id - Looking for:', userId);
    console.log('Current users:', users.map(u => u.id));
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        console.log('User not found, returning 404');
        return res.status(404).json({
            error: 'User not found'
        });
    }
    
    console.log('User found:', user);
    return res.status(200).json(user);
});
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const {name, email}= req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
        error: 'User not found'
        });
    }
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    return res.status(200).json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({
        error: 'User not found'
    });
   }
   users.splice(userIndex, 1);
   return res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing