import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? "

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {
    //CHECK USER TOKEN
    const token = req.cookies.accessToken
    //IF NOT LOGGED IN
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "yu19151998", (err, userInfo) => {
        //IF WRONG USER
        if (err) return res.status(403).json("Token not valid")

        const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUE (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).send(err)

            return res.json("Post created")
        })
    })
}

export const deletePost = (req, res) => {
    //CHECK USER TOKEN
    const token = req.cookies.accessToken
    //IF NOT LOGGED IN
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "yu19151998", (err, userInfo) => {
        //IF WRONG USER
        if (err) return res.status(403).json("Token not valid")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You are not the post owner")

            return res.json("Post deleted")
        })
    })
}

export const updatePost = (req, res) => {
    //CHECK USER TOKEN
    const token = req.cookies.accessToken
    //IF NOT LOGGED IN
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "yu19151998", (err, userInfo) => {
        //IF WRONG USER
        if (err) return res.status(403).json("Token not valid")

        const postId = req.params.id
        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            userInfo.id
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).send(err)

            return res.json("Post updated")
        })
    })
}