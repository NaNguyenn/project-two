import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"

const Write = () => {
    const state = useLocation().state
    const [value, setValue] = useState(state?.desc || "")
    const [title, setTitle] = useState(state?.title || "")
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat || "")

    const navigate = useNavigate()

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await axios.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) {
            imgUrl = await upload()
        } else {
            imgUrl = state.img
        }

        try {
            //IF UPDATING OLD POST
            state ? await axios.put(`/posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: imgUrl
            })
                //IF WRITING NEW POST
                : await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    img: imgUrl,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                })
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='write'>
            <div className="postContainer">
                <input className='postTitle' value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' />
                <input id='postImgFile' onChange={e => setFile(e.target.files[0])} type="file" />
                <label className='postImgBtn' htmlFor="postImgFile">Upload Image</label>
                <label htmlFor="postCatSelect">Select news category: </label>
                <select name="postCat" value={cat} onChange={e => setCat(e.target.value)} id="postCatSelect">
                    <option value="" disabled>--Please choose an option--</option>
                    <option value="local">Local</option>
                    <option value="world">World</option>
                </select>
                <div className='editorContainer'>
                    <ReactQuill className='editor' theme="bubble" value={value} onChange={setValue} placeholder="Write the content..." />
                </div>

                <button onClick={handleClick}>Publish</button>
            </div>
        </div>
    )
}

export default Write