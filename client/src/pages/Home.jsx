import React, { useEffect, useState } from 'react'
import {
    Link, useLocation
} from "react-router-dom";
import axios from "axios"

const Home = () => {
    const [posts, setPosts] = useState([])

    //GET category FROM URL
    const cat = useLocation().search

    //UPDATE posts WHEN category CHANGES
    useEffect(() => {
        //FETCH posts DATA FROM SERVER
        const fetchData = async () => {
            try {
                //SEND GET REQUEST WITH category QUERY TO SERVER
                const res = await axios.get(`/posts${cat}`)
                //UPDATE posts WITH RESPONSE DATA
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [cat])

    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis odio nec ex cursus, id gravida nulla dignissim.",
    //         img: "https://images.pexels.com/photos/14143253/pexels-photo-14143253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     }

    return (
        <div className='home'>
            <div className="posts">
                {posts.map(post => (
                    <Link className='link' to={`/post/${post.id}`}>
                        <div className="post" key={post.id}>
                            <div className="postTitleContainer">

                                <div className="postTitle">{post.title}</div>
                                <div className="postCategory">{post.cat}</div>
                            </div>

                            <div className="postImgContainer">
                                <img className='postImg' src={`../uploads/${post.img}`} alt="" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home
