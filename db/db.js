const mysql = require("mysql")

let connction = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "1705d-wj"
})

connction.connect((err) => {
    if (err) {
        console.log("err");
    } else {
        console.log("success");
    }
})

module.exports = connction