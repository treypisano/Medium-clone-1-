import { createComment } from "../../store/articlesReducer"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import "./create-comment.css"

export default function CreateComment() {
    const [body, setBody] = useState('')
    const [label, setLabel] = useState('Post')
    const currentUserId = useSelector(state => Object.values(state.users).slice(-1)[0]?.id) // gets the last user in the session
    const currentUserEmail = useSelector(state => Object.values(state.users).slice(-1)[0]?.email)
    const { articleId } = useParams()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()

        dispatch(createComment({comment: 
            {body: body, 
            user_id: currentUserId, 
            article_id: articleId, 
            author: 
                {email: currentUserEmail}}}))
        setBody('')
    }
    let commentFragment = 
    <>
        <p id="thoughts">What are your thoughts?</p>
        <form>
        <textarea id="comment-box" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </form>
        {body.length > 0 && <input type="button" value={label} id="post-comment" onClick={handleClick} ></input>}
    </>

    return (
        <div className="new-comment">
            {currentUserId && commentFragment}
        </div>
    )
}