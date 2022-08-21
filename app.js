const express = require('express')
const seedData = require('./seed-data')
const app = express()
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Welcome to Konzek BootCamp')
// })

app.get('/developers', (req, res) => { // INDEX
  res.status(200).send(seedData)
})

app.get('/developers/:id', (req, res) => { // SHOW
  const id = req.params.id
  const developer = seedData.find(dev => dev.id === parseInt(id))
  if (developer) {
    res.status(200).send(developer)
  } else {
    res.status(404).send('Developer not found')
  }
})

let nextDeveloperId = 4
app.post('/developers', (req, res) => { // CREATE
  const newDeveloper = req.body
  if (newDeveloper.name === undefined || newDeveloper.name === null) {
    res.status(400).send('Developer name is required')
  } else if (newDeveloper.skills.length < 0) {
    res.status(400).send('Developer skills is required')
  } else if (!Array.isArray(newDeveloper.skills)) {
    res.status(400).send('Developer skills should be an array and not be empty')
  } else if (!newDeveloper.title) {
    res.status(400).send('Developer title is required')
  } else if (!newDeveloper.salary) {
    res.status(400).send('Developer salary is required')
  } else if (typeof (newDeveloper.salary) !== 'number') {
    res.status(400).send('Salary must be a number')
  } else {
    newDeveloper.id = nextDeveloperId
    nextDeveloperId++
    seedData.push(newDeveloper)
    console.log(newDeveloper)
    res.status(200).send(newDeveloper)
  }
})

app.put('/developers/:id', (req, res) => { // REPLACE
  const replacedDeveloperId = req.params.id
  const replacedDeveloper = seedData.find(dev => dev.id === parseInt(replacedDeveloperId))
  if (replacedDeveloper && replacedDeveloperId) {
    if (!req.body.name) {
      res.status(400).send('Name parameter is required!!')
    } else if (req.body.skills.length < 0) {
      res.status(400).send('Skills parameter is required!!')
    } else if (!Array.isArray(req.body.skills)) {
      res.status(400).send('Skills parameter should be an array or length of not less than zero!!')
    } else if (!req.body.salary) {
      res.status(400).send('Salary parameter is required!!')
    } else if (typeof (req.body.salary) !== 'number') {
      res.status(400).send('Salary parameter should be number type!!')
    } else if (!req.body.title) {
      res.status(400).send('title parameter is required!!')
    } else {
      replacedDeveloper.name = req.body.name
      replacedDeveloper.skills = req.body.skills
      replacedDeveloper.salary = req.body.salary
      replacedDeveloper.title = req.body.title
      res.status(200).send(replacedDeveloper)
    }
  } else {
    res.status(404).send("developer not found")
  }

})

app.listen(3005, () => {
  console.log('Listening on http://localhost:3005');
});