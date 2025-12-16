import express from "express";
import cors from "cors";

const app = express();

// Enable CORS
app.use(
    cors({
        origin: "*", // frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);


// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
