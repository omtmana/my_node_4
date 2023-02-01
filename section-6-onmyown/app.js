const express = require('express')
const app = express()

// Defining our routes with http methods
app.get('/', (req, res) => {
   res.send('Hello from the server side')
})

// Create/Start a server
const port = 3000
app.listen(port, () => {
   console.log(`Running on port ${port}`)
})