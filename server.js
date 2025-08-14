const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];

// [C] Create 
app.post('/users', (req,res) =>{
    const { name, email } = req.body;
    const id = users.length + 1;
    users.push({ id, name, email })
    res.json({ message:"User created", user:{ id, name, email }});
})

// [R] Read All
app.get('/users', (req, res) => {
    res.json(users);
})

// [R] Read One
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    user ? res.json(user) : res.status(404).json({ error: "User not found"});
});

// [U] Update 
app.put('/users/:id', (req,res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json({ message: "User Updated", user });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// [D] Delete
app.delete('/users/:id', (req,res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User Deleted!" });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
