import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
    const [value, setValue] = useState('');
    return (
        <div className='write'>
            <div className="postContainer">
                <input className='postTitle' type="text" placeholder='Title' />
                <input id='postImgFile' type="file" />
                <label className='postImgBtn' htmlFor="postImgFile">Upload Image</label>
                <label htmlFor="postCatSelect">Select news category: </label>
                <select name="postCat" id="postCatSelect">
                    <option value="local">Local</option>
                    <option value="world">World</option>
                </select>

                <div className='editorContainer'>
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
        </div>
    )
}

export default Write