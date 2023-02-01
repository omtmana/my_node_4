// import express module
const express = require('express')
// calling express 
const app = express()
// import fs to read file
const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// We specify what happens after get request through a call back function (our second arg)
app.get('/tours', (req, res) => {
   res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
         tours: tours
      }
   })
})

// pass in the port and a callback function
const port = 3000
app.listen(port, () => {
   console.log(`App running on ${port}...`)
})