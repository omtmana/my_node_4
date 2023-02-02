// Step 1: import packages
const express = require('express')
const app = express()
const fs = require('fs')

// Middleware to be able to post data
app.use(express.json())

// Step 3: Read a file at the top level
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// Step 4: Creating our routes
// GET method
app.get('/tours', (req, res) => {
   res.status(200).json({ tours })
})

//  GET with parameters method
app.get('/tours/:id', (req, res) => {
   const id = req.params.id * 1
   if (id > tours.length - 1) {
      return res.status(404).json({ status: 'fail', message: 'ID not found' })
   }
   const tour = tours.find(el => el.id === id)

   res.status(200).json({ tour })
})

// POST method
app.post('/tours', (req, res) => {
   // adding a new id at the end of the json file
   const newId = tours[tours.length - 1].id + 1
   const newTour = Object.assign({ id: newId }, req.body)
   tours.push(newTour)

   // Persist by writing the file to json
   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      res.status(200).json({ data: { tour: newTour } })
   })
})


// Step 2: Create/start a server
const port = 3000
app.listen(port, () => {
   console.log(`Server is running on port: ${port}`)
})
