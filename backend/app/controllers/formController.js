import Form from '../models/formModel.js'
import { validationResult } from 'express-validator';
const formCtrl={}

// GET all forms
formCtrl.list=async (req,res)=>{
 try{
    const forms=await Form.find()
    res.json(forms)
 }catch(err){
    console.log(err)
    res.status(500).json({error:'Something went wrong'})

 }
}


// POST new form
formCtrl.create=async(req,res)=>{
    const body=req.body
    try{
        const form = new Form(body)
        await form.save()
        res.status(201).json(form)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}


// GET one form
formCtrl.show=async (req,res)=>{
    const id =req.params.id
    try{
        const form=await Form.findById(id)
        if(!form){
            res.status(404).json({error:'Form not found'})
        }
        res.json(form)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}


// PUT update form
formCtrl.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const form=await Form.findByIdAndUpdate(id,body,{new:true})
        if(!form){
            res.status(404).json({error:'Form not found'})
        }
        res.json(form)

    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}
//Delete form
formCtrl.delete=async(req,res)=>{
    const id=req.params.id
    try{
        const form=await Form.findByIdAndDelete(id)
        if(!form){
            res.status(404).json({error:'Form not found'})
        }
        res.json(form)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong'})
    }
}

export default formCtrl
