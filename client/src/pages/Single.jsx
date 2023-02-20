import React, { useContext, useEffect, useState } from 'react'
import EditButtonImg from '../img/edit.png'
import DeleteButtonImg from '../img/delete.png'
import {
    Link, useLocation, useNavigate
} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Single = () => {
    //INITIALIZE POST STATE AND SETTER FUNCTION
    const [post, setPost] = useState([])

    //NAVIGATE FUNCTION
    const navigate = useNavigate()

    //GET POSTID FROM URL
    const location = useLocation()
    const postId = location.pathname.split("/")[2]

    //GET CURRENT USER OBJECT
    const { currentUser } = useContext(AuthContext)

    //FETCH DATA FROM SERVER WHEN postId CHANGES
    useEffect(() => {
        const fetchData = async () => {
            try {
                //GET to posts.js
                const res = await axios.get(`/posts/${postId}`)
                setPost(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [postId])

    //DELETE POST FROM SERVER AND NAVIGATE TO HOME PAGE
    const handleDelete = async () => {
        try {
            //GET to posts.js
            await axios.delete(`/posts/${postId}`)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    //RENDER IF LOGGED IN
    if (currentUser) {
        return (
            <div className='single'>
                <div className="postContainer">
                    <div className="postTitle">{post.title}</div>
                    <img className='postImg' src={`../uploads/${post.img}`} alt="" />
                    <div className="userContainer">
                        <img className='userImg' src={post.userImg} alt="" />
                        <div className="userInfo">
                            <div className="userName">{post.username}</div>
                            <div className="postTime">posted on {new Date(post.date).toLocaleString()}</div>
                        </div>
                        {/* ONLY RENDER EDIT BUTTONS WHEN USER IS THE AUTHOR */}
                        {(currentUser.username === post.username || currentUser.admin === 1) &&
                            <div className="edit">
                                <Link to={`/write?edit=1`} state={post}>
                                    <img className='editBtn' src={EditButtonImg} alt="" />
                                </Link>
                                <img onClick={handleDelete} className='deleteBtn' src={DeleteButtonImg} alt="" />
                            </div>
                        }
                    </div>
                    {/* RENDER POST CONTENT FROM react quill DATA */}
                    <div className="postContent" dangerouslySetInnerHTML={{ __html: post.desc }}></div>
                </div>
            </div>
        )
    }
    //RENDER WHEN NOT LOGGED IN
    else {
        return (
            <div className='single'>
                <div className="postContainer">
                    <div className="postTitle">{post.title}</div>
                    <img className='postImg' src={`../uploads/${post.img}`} alt="" />
                    <div className="userContainer">
                        <img className='userImg' src={post.userImg} alt="" />
                        <div className="userInfo">
                            <div className="userName">{post.username}</div>
                            <div className="postTime">posted on {new Date(post.date).toLocaleString()}</div>
                        </div>
                    </div>
                    {/* RENDER POST CONTENT FROM react quill DATA */}
                    <div className="postContent" dangerouslySetInnerHTML={{ __html: post.desc }}></div>
                </div>
            </div>
        )
    }
}

export default Single