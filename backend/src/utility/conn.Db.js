const dns = require("dns")
const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        const url = process.env.MONGO_DB_URL;
        if (!url) {
            console.log("want url");
        }
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        await mongoose.connect(url);
        console.log("connectmongodb")
    }
    catch (error) {
        console.log(error)

    }
}
module.exports = connectDb;