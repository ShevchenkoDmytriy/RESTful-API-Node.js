
//node -v
// cd (путь к папке проекта)
// npm init -y  (закрепить ноду за папкой проекта)
//npm install express body-parser
//node server.js - запустить сервер 



const express = require('express')
const bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.json());


// "http://localhost:3000/"

app.get('/', (req, res) =>{
    res.send('Hello World');
});




const users = [];
let currentId = 1;


app.get('/users', (req, res) => {
  res.json(users);
});


app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  };

  users.push(user);
  res.json(user);
});


app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});


app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = {
    id: userId,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  };

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});


app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});



const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
