const express = require('express');
const app = express();
require("dotenv").config();

const pullRouter = require('./routes/pull');
const memRouter = require('./routes/mem'); // contains /api/analyze and saving



const cors = require("cors");
const cookieParser = require("cookie-parser");
const commitRouter = require('./routes/commitSummary');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
}));

app.use('/', pullRouter);   // For /api/pull-requests
app.use('/', memRouter);    // For /api/analyze (and saving to DB)
app.use('/', commitRouter); 
// SERVER
app.listen(7777, () => {
    console.log("Server running on http://localhost:7777");
});
