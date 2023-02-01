// Step 1: Import express module
const express = require('express')
const app = express()
const fs = require('fs')

// Step 3a: Create a var that reads the file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// Step 3: Create routes and route handlers
// GET method route handler
const getAllRoutes = (req, res) => {
   res.status(200).json({
      status: 'success', data: { tours }
   })
}

// GET with params
const getTour = (req, res) => {
   const id = req.params.id * 1
   if (id > tours.length) {
      return res.status(404).json({
         status: 'Fail',
         message: 'Not found'
      })
   }
   const tour = tours.find(el => el.id === id)

   res.status(200).json({status: 'success', data: {
      tour
   }})
}


// Routes
app.get('/tours', getAllRoutes)
app.get('/tours/:id', getTour )


// Step 2: Set up/Create/Start Server
const port = 3000
app.listen(port, () => {
   console.log(`Running on port ${port}...`)
})