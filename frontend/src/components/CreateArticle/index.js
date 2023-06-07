import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../store/articlesReducer';

export default function CreateArticle () {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
  
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(createArticle({article: {body, title, user_id: currentUserId}}))

        setTitle('');
        setBody('');
    };


    return (
        <>
        <h1>
            Create an Article!
        </h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                <div>
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                </div>
                <button type="submit">Submit</button>
            </form>
      </>
    );
}