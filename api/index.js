import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import { db } from "./db.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get("/test", (req, res) => {
    res.json("It worked!")
})

// Test database connection
app.get("/users", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
//If fails
// ALTER USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'yu19151998'

app.listen(2000, () => {
    console.log("Connected!")
})