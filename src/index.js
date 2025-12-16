import express from "express";
import cors from "cors";
import dotenv from "dotenv"
// import nodem from './utils/sendMail.js'
dotenv.config()

const app = express();

// Enable CORS
app.use(
    cors({
        origin: "*", // frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.get("/",(req,res)=>{
    res.status(200).json({message:"Project Start For RJ-Fitness-NodeBK"})
})


// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/`);
    
    console.log("Server is running on port" , process.env.PORT);
});
