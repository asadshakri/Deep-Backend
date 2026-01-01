const express=require('express');
require("dotenv").config();
const app=express();
const port=process.env.PORT||3000




const eventRouters=require('./Router/eventRouter');

const DB = require("./utils/db-connection");
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use('/api/v3/app',eventRouters);

(async () => {
    try {
      await DB.connectDB();
app.listen(port,()=>{
console.log(`Server is running on http://localhost:${port}`);
    });
    } catch (err) {
      console.error("Server startup failed:", err);
   }
 })();
