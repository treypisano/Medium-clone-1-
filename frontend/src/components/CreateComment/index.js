import { createComment } from "../../store/articlesReducer"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

export default function CreateComment() {
    const [body, setBody] = useState('')
    const [label, setLabel] = useState('Post')
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
    const currentUserEmail = useSelector(state => Object.values(state.users)[0].email)
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

    }

    return (
        <div className="new-comment">
            <p>Put a Comment Here!</p>
            {/* <form> */}
                <input type="textbox" onChange={(e) => setBody(e.target.value)}></input>
                <input type="button" value={label} onClick={handleClick} ></input>
            {/* </form> */}
        </div>
    )
}