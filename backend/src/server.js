import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

// middleware
app.use(cors({
   origin: "http://localhost:5173",
}) 
);
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter)
// our simple custom middleware 
// app.use((req,res,next)=>{
// console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// next();
// })
app.use("/api/notes", notesRoutes);
 
// connect database and then application should start
connectDB().then(()=>{

  app.listen(PORT, () => {
  console.log("sevrver is running on the PORT",PORT)
})
})




// mongodb+srv://farhankhan:<Fk865621#>@cluster0.xjlciy9.mongodb.net/?appName=Cluster0