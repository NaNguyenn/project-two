import React from 'react'
import EditButtonImg from '../img/edit.png'
import DeleteButtonImg from '../img/delete.png'
import {
    Link
} from "react-router-dom";

const Single = () => {
    return (
        <div className='single'>
            <div className="postContainer">
                <div className="postTitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                <img className='postImg' src="https://images.pexels.com/photos/14143253/pexels-photo-14143253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <div className="userContainer">
                    <img className='userImg' src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className="userInfo">
                        <div className="userName">Nguyen</div>
                        <div className="postTime">posted 2 hours ago</div>
                    </div>
                    <Link to={`/write?edit=1`}>
                        <img className='editBtn' src={EditButtonImg} alt="" />
                    </Link>
                    <Link>
                        <img className='deleteBtn' src={DeleteButtonImg} alt="" />
                    </Link>
                </div>
                <div className="postContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis odio nec ex cursus, id gravida nulla dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ullamcorper maximus magna, id mattis est placerat ut. Cras nec vehicula nisi. Nam non est at leo convallis accumsan. Nulla tincidunt pellentesque pretium. Donec et mauris ut dolor pulvinar condimentum id id metus. Proin laoreet eleifend tempus. Aenean sem libero, vestibulum gravida tristique a, auctor at velit. Morbi varius neque sem, eu ullamcorper lectus volutpat a. Cras tempus facilisis tincidunt. Ut sem tortor, posuere sagittis ante vitae, condimentum tristique eros. Aliquam varius elit non augue congue sollicitudin. Pellentesque accumsan laoreet orci, non fermentum mi vehicula id. Phasellus sollicitudin tincidunt nulla vel tincidunt. Nullam est sapien, consequat ac ullamcorper id, elementum ac magna.</div>
            </div>
        </div>
    )
}

export default Single