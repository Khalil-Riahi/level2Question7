const mongoose=require('mongoose')
const dotenv=require('dotenv')


dotenv.config({path:'./config.env'})
const app=require('./app')


const db=process.env.DATABASE
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('DB Connection Successful'))

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
  });
// console.log(process.env)



const port =8000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
});