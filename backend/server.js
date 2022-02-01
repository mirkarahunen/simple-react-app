const express = require("express")
const app = express()
const port = 5000
const cors = require('cors')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')

//Middleware
app.use(cors())
app.use(fileupload())
app.use(express.static('uploads/images'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Routes
const userRoute = require('./user-route')
app.get('/api/getUser', userRoute.getUsers)
app.post('/api/getMore', userRoute.getMoreUserInfo)

// Connect to express server
app.listen(port, (error) => {
    if(error) console.log(error);
    console.log('App listening on port ' + port);
})