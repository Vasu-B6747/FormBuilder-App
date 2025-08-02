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
// import mongoose from "mongoose";

// const configureDb = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to DB");
//   } catch (err) {
//     console.error("❌ Failed to connect to DB:", err.message);
//   }
// };

// export default configureDb;
