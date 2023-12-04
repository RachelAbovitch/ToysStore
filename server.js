const { app } = require("./app")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { error } = require("console");

dotenv.config();
const mongoURL = process.env.MONGO_URL;
console.log(mongoURL,"mongoUrl");
mongoose.connect(mongoURL)
.then((con)=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`the server is runing on port:${PORT}`)
})