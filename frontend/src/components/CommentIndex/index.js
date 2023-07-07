import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./commentindex.css"
import { deleteComment, editComment } from "../../store/articlesReducer";

export default function CommentIndex () {
    const { articleId } = useParams()
    const currentUser = useSelector(state => Object.values(state.users).slice(-1)[0])
    const comments = useSelector(state => state.articles[articleId]?.comments)
    if (!comments) {
        return (
            <div>
                No Comments!
            </div>
        )
    }
    const commentsArray = Object.values(comments).reverse()

    return (
        <div className="comments">
            {
            commentsArray.map((comment, i) => {
                return (
                    <SingleComment comment={comment} currentUser={currentUser}/>
                )
            })}
        </div>
    )
}

function SingleComment( {comment, currentUser} ) {
    const sameUser = currentUser?.email === comment.author.email  
    const [body, setBody] = useState(comment.body)
    const [editClicked, setEditClicked] = useState(false)
    const currentUserId = useSelector(state => Object.values(state.users).slice(-1)[0]?.id) // gets the last user in the session
    const currentUserEmail = useSelector(state => Object.values(state.users).slice(-1)[0]?.email)
    const { articleId } = useParams()
    const dispatch = useDispatch()

    const handleEdit = (e) => {
        setBody(comment.body)
        setEditClicked(!editClicked)
    }

    const handleCommentDelete = (e) => {
        dispatch(deleteComment(comment.id))
    }

    const handleUpdateClick = (e) => {
        
        dispatch(editComment({comment: 
            {body: body, 
            id: comment.id,
            user_id: currentUserId, 
            article_id: articleId
            }}))
        .then((comment) => {
            if (comment) {
                setEditClicked(false)
                setBody(comment.body)
            }
        })
    }

    return (
        <div className="single-comment" key={comment.id}>
            <div className="author-crud">
                <p className="comment-author" key={comment.id}>{comment.author.email}</p>
                {sameUser && <div className="update-delete-comment">
                    <p className="edit-comment" onClick={handleEdit}>Edit</p>
                    <p className="delete-comment" onClick={handleCommentDelete}>Delete</p>
                </div>}
            </div>
            {
                editClicked 
                ? 
                    <>
                        <input type="textbox" required value={body} onChange={(e) => setBody(e.target.value)}></input>
                        <input type="button" value="Update Comment" onClick={handleUpdateClick}></input>
                    </> 
                : 
                    <p className="comment-body" key={comment.id}>{comment.body}</p> 
            }
            
        </div>
    )
}