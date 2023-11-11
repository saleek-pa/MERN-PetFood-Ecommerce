require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Connected Successfully"));

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
