import React, { useContext, useEffect, useState } from 'react'
import EditButtonImg from '../img/edit.png'
import DeleteButtonImg from '../img/delete.png'
import {
    Link, useLocation, useNavigate
} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Single = () => {
    const [post, setPost] = useState([])

    const navigate = useNavigate()

    //GET POSTID FROM URL
    const location = useLocation()
    const postId = location.pathname.split("/")[2]

    const { currentUser } = useContext(AuthContext)

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

    const handleDelete = async () => {
        try {
            //GET to posts.js
            await axios.delete(`/posts/${postId}`)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='single'>
            <div className="postContainer">
                <div className="postTitle">{post.title}</div>
                <img className='postImg' src={`../uploads/${post.img}`} alt="" />
                <div className="userContainer">
                    <img className='userImg' src={post.userImg} alt="" />
                    <div className="userInfo">
                        <div className="userName">{post.username}</div>
                        <div className="postTime">posted on {post.date}</div>
                    </div>
                    {currentUser.username === post.username &&
                        <div className="edit">
                            <Link to={`/write?edit=1`} state={post}>
                                <img className='editBtn' src={EditButtonImg} alt="" />
                            </Link>
                            <img onClick={handleDelete} className='deleteBtn' src={DeleteButtonImg} alt="" />
                        </div>
                    }
                </div>
                <div className="postContent" dangerouslySetInnerHTML={{ __html: post.desc }}></div>
            </div>
        </div>
    )
}

export default Single