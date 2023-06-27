import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./commentindex.css"

export default function CommentIndex () {
    const { articleId } = useParams()
    const currentUser = useSelector(state =>  Object.values(state.users).slice(-1)[0])
    const comments = useSelector(state => state.articles?.[articleId].comments)
    if (!comments) {
        return (
            <div>
                No Comments!
            </div>
        )
    }

    return (
        <div className="comments">
            {Object.values(comments).map((comment, i) => {
                const sameUser = currentUser.email === comment.author.email  
                // debugger
                return (
                    <div className="single-comment">
                        <div className="author-crud">
                            <p className="comment-author" key={comment.id}>{comment.author.email}</p>
                            {sameUser && <div className="update-delete-comment">
                                <p className="edit-comment">Edit</p>
                                <p>Delete</p>
                            </div>}
                        </div>
                        <p className="comment-body" key={comment.id}>{comment.body}</p> 
                    </div>
                )
            })}
        </div>
    )
}