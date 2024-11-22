const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express(); 
app.use(cors());

const db = mysql.createConnection({
    host: "localhost:3307",
    user: "root", 
    password: "",
    database: "useraccount"

})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users ('username', 'email', 'password_hash') VALUES (?)";
    const values = [
        req.body.name, 
        req.body.email, 
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(8081, ()=> {
    console.log("listening"); 

})