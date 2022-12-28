import React, { useEffect, useState } from 'react'
import {
    Link, useLocation
} from "react-router-dom";
import axios from "axios"

const Home = () => {
    const [posts, setPosts] = useState([])

    const cat = useLocation().search


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${cat}`)
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
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis odio nec ex cursus, id gravida nulla dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ullamcorper maximus magna, id mattis est placerat ut. Cras nec vehicula nisi. Nam non est at leo convallis accumsan. Nulla tincidunt pellentesque pretium. Donec et mauris ut dolor pulvinar condimentum id id metus. Proin laoreet eleifend tempus. Aenean sem libero, vestibulum gravida tristique a, auctor at velit. Morbi varius neque sem, eu ullamcorper lectus volutpat a. Cras tempus facilisis tincidunt. Ut sem tortor, posuere sagittis ante vitae, condimentum tristique eros. Aliquam varius elit non augue congue sollicitudin. Pellentesque accumsan laoreet orci, non fermentum mi vehicula id. Phasellus sollicitudin tincidunt nulla vel tincidunt. Nullam est sapien, consequat ac ullamcorper id, elementum ac magna.",
    //         img: "https://images.pexels.com/photos/14143253/pexels-photo-14143253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis odio nec ex cursus, id gravida nulla dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ullamcorper maximus magna, id mattis est placerat ut. Cras nec vehicula nisi. Nam non est at leo convallis accumsan. Nulla tincidunt pellentesque pretium. Donec et mauris ut dolor pulvinar condimentum id id metus. Proin laoreet eleifend tempus. Aenean sem libero, vestibulum gravida tristique a, auctor at velit. Morbi varius neque sem, eu ullamcorper lectus volutpat a. Cras tempus facilisis tincidunt. Ut sem tortor, posuere sagittis ante vitae, condimentum tristique eros. Aliquam varius elit non augue congue sollicitudin. Pellentesque accumsan laoreet orci, non fermentum mi vehicula id. Phasellus sollicitudin tincidunt nulla vel tincidunt. Nullam est sapien, consequat ac ullamcorper id, elementum ac magna.",
    //         img: "https://images.pexels.com/photos/10411848/pexels-photo-10411848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //     }
    // ]

    return (
        <div className='home'>
            <div className="posts">
                {posts.map(post => (
                    <Link className='link' to={`/post/${post.id}`}>
                        <div className="post" key={post.id}>
                            <div className="postImgContainer">
                                <img className='postImg' src={`../uploads/${post.img}`} alt="" />
                            </div>
                            <div className="postTitleContainer">

                                <div className="postTitle">{post.title}</div>

                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Home