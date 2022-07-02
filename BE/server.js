const route = require("./routes/root.routes");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const mongodb=require("./config/mongodb");
var cookieParser = require('cookie-parser');

mongodb.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors());

route(app);

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});