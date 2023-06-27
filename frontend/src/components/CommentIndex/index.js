import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function CommentIndex () {
    const { articleId } = useParams()
    const comments = useSelector(state => state.articles?.[articleId].comments)
    
    if (Object.values(comments).length === 0) {
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
                    <div>
                        <li key={comment.id}>{comment.body}</li>
                        {/* <li key={comment.id}>{comment.author.email}</li> */}
                    </div>
                )
            })}
        </div>
    )
}