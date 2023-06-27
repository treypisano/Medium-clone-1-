import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./commentindex.css"

export default function CommentIndex () {
    const { articleId } = useParams()
    const currentUser = useSelector(state =>  Object.values(state.users))
    const comments = useSelector(state => state.articles?.[articleId].comments)
    // debugger
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
                return (
                    <div className="single-comment">
                        <p className="comment-author" key={comment.id}>{comment.author.email}</p>
                        <p className="comment-body" key={comment.id}>{comment.body}</p>
                    </div>
                )
            })}
        </div>
    )
}