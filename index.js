// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json())

const port = 5000;

server.get('/', (req, res) => {
    res.send('Hello Node 23');
})

server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});

//POST 1
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(userID => {
        res.status(200).json(`A new user was created ${userID.id}`)
        // res.status(200).json(userID)
    })
    .catch(err => {
        res.status(500).json({ message: 'A new user could not be created'})
    })
})

//GET 1
server.get('/api/users', (req, res) => {
    // route handler code here
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: 'The users information could not be recieved'})
    })
  });

  //GET 2
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user){
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'The user with this ID does not exist'})
        }     
    })
    .catch(err => {
        res.status(500).json({ message: 'The user information could not be recieved'})
    })
})  

//const id = req.params.id;
//20.75

//Delete
server.delete('/api/users/:id', (req, res) => {
    const idDel = req.params.id;
    db.remove(idDel)
    .then(user => {
        res.status(200).json(`${idDel} was Deleted`)
    })
    .catch(err => {
        res.status(500).json({ message: 'The user information could not be deleted'})
    })
})

//Update
server.update('/api/users/:id', (req, res) => {
    const idUpdate = req.params.id;
    db.update(idUpdate)
    .then(user => {
        res.status(200).json(`${idUpdate} was updated`)
    })
    .catch(err => {
        res.status(500).json({ message: 'The user information could not be deleted'})
    })
})