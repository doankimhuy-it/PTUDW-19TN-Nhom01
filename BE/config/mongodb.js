require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        console.log("Connect: "+process.env.DATABASE_URL);
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Connect MongoDB successfully!!!');
    } catch (error) {
        console.log('Connect MongoDB failure!!!');
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connect };