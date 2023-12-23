const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost' , 
    user: 'root' , 
    password: '' , 
    database: 'sign in/sign up'
  })

  module.exports = db