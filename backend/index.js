import express from 'express'
import configureDb from './config/configure.js'
import { checkSchema } from 'express-validator'
import formCtrl from './app/controllers/formController.js' 
import { idValidationSchema } from './app/validators/idValidation.js'
import formValidationSchema from './app/validators/formValidator.js'
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
app.post('/form/create',checkSchema(formValidationSchema),formCtrl.create)
app.put('/form/edit/:id',checkSchema(idValidationSchema),formCtrl.update)
app.get('/form/:id',checkSchema(idValidationSchema),formCtrl.show)
app.delete('/form/:id',checkSchema(idValidationSchema),formCtrl.delete)


app.listen(port,()=>{
    console.log('server is running on port ',port)
})
