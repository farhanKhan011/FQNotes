import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";


import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

// middleware
if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
  }) 
);
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter)

// our simple custom middleware 
// app.use((req,res,next)=>{
// console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// next();
// })

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
// connect database and then application should start
connectDB().then(()=>{

  app.listen(PORT, () => {
  console.log("sevrver is running on the PORT",PORT)
})
})
<<<<<<< HEAD

=======
>>>>>>> 40f35c853a6cbb30bc336e80c148c254a6462421
