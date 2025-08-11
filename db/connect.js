const mongoose = require("mongoose");
const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log("connect db..."))
    .catch((err) => console.log(err));
};
console.log(connectDB);
module.exports = connectDB;