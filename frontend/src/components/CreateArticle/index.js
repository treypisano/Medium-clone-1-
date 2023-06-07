import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../store/articlesReducer';
import NavBar from "../NavBar";
import { useHistory } from "react-router-dom";
import "./createarticle.css"

export default function CreateArticle () {
    const [title, setTitle] = useState('Title');
    const [body, setBody] = useState('Tell Your Story');
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
    
    let history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(createArticle({article: {body, title, user_id: currentUserId}}))

        setTitle('');
        setBody('');

        history.push('/')
    };

    function onTitleChange(e) { // if title includes "Title" it will delete the body
        if (title === "Title" ) {
            setTitle('')
        } else {
            setTitle(e.target.value)
        }
        
    }

    function onBodyChange(e) {
        if (body === "Tell Your Story"){
            setBody('')
        } else {
            setBody(e.target.value)
        }
    }

    return (
        <>
        <NavBar />
        <div className='create-wrapper'>
            <div className='create'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <input
                        type="text"
                        id="create-title"
                        value={title}
                        onChange={onTitleChange}
                    />
                    </div>
                    <div>
                    <textarea
                        id="body"
                        value={body}
                        onChange={onBodyChange}
                    />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
      </>
    );
}