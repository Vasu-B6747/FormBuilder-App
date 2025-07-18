import express from 'express'
import configureDb from './config/configure.js'
import formCtrl from './app/controllers/formController.js' 
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
const port=3010
configureDb()
app.use(express.json())
app.use(cors())


//routes
app.get('/forms',formCtrl.list)
app.post('/form/create',formCtrl.create)
app.put('/form/edit/:id',formCtrl.update)
app.get('/form/:id',formCtrl.show)
app.delete('/form/:id',formCtrl.delete)


app.listen(port,()=>{
    console.log('server is running on port ',port)
})
