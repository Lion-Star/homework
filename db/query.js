let connection = require("./db")

module.exports = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}