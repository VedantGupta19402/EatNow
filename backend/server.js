require('dotenv').config();
const app=require("./src/app")
const connectDb=require("./src/utility/conn.Db.js")
app.listen(4000,()=>{
    console.log("server is running")
    connectDb()
})