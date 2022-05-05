const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errors')
const userRouter = require('./routes/user.routes')
const companyRouter = require('./routes/company.routes')

const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.mongoURI


mongoose.connect(mongoURI)
  .then(()=>{ console.log("db connected"); })
  .catch((err)=> console.log(err));

app.use(express.json())

app.use('/users', userRouter)
app.use('/companies', companyRouter)

// Error Handling
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server up and running on port : ${PORT}`)
})