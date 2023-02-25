import { db } from "../db.js"
import jwt from "jsonwebtoken"

// Register logic 
export const register = (req, res) => {

    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(499).json("User existed")

        //IF NOT EXISTING, CREATE NEW USER
        const q = "INSERT INTO users(`username`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.password
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User created")
        })
    })
}

// Login logic
export const login = (req, res) => {

    //CHECK USER
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("Wrong user name or password!")

        //CHECK PASSWORD
        const isPasswordCorrect = req.body.password === data[0].password

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        //STORE USER INFO INTO COOKIE USING jsonwebtoken AND cookie-parser
        const token = jwt.sign({ id: data[0].id }, "yu19151998")
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(data[0])
    })
}

// Logout logic 
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logged out")
}