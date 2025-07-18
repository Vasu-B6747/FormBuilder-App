import mongoose from "mongoose"
const configureDb=async()=>{
    try{
    const db=mongoose.connect(process.env.DB_URL)
    console.log('connected to db')
    }catch(err){
        console.log('error to connected to db',err)
    }
}
export default configureDb