const express = require('express')

//Routes
const { usersRouter } = require('./routes/user.routes')

//init server
const app = express()

//import json
app.use(express.json())

//endpoints
app.use('/api/v1/users', usersRouter)

module.exports = { app }

//sequelize
//    .authenticate()
//    .then(() => console.log('Database authenticated'))
//    .catch(error => console.log(error))    

//sequelize
//    .sync()
//    .then(() => console.log('Database sync'))
//    .catch(error => console.log(error))

//app.listen(4000, () => {
//    console.log('Running express server')
//})