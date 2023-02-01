// import express module
const express = require('express')
// calling express 
const app = express()
// import fs to read file
const fs = require('fs')
// create middleware
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// We specify what happens after get request through a call back function (our second arg)
// GET method
app.get('/tours', (req, res) => {
   res.status(200).json({tours})
})

// GET specific
app.get('/tours/:id', (req, res) => {
   console.log(req.params)
   res.status(200).json({
      status: 'success!'
   })
})

// POST request
app.post('/tours', (req, res) => {
   // create an id to add after the last one
   const newId = tours[tours.length - 1].id + 1
   // Object.assign
   const newTour = Object.assign({id: newId}, req.body)
   // Add to the end of the array
   tours.push(newTour)

   // Final step to write in the file to persist
   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour
         }
      })
   })
})

// pass in the port and a callback function
const port = 3000
app.listen(port, () => {
   console.log(`App running on ${port}...`)
}) 