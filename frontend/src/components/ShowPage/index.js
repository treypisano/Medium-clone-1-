import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux"
import { fetchArticles } from "../../store/articlesReducer"
import "./showpage.css"
import NavBar from "../NavBar"

export default function ShowPage() {
    const { articleId } = useParams()
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
    const article = useSelector(function(state) {
        return state.articles[articleId]
    })

    return (
        <>
            <NavBar style="nav-bar-show-page"></NavBar>
            <div className="article-wrapper">
                <div className="article-show">
                    <h1 className="article-title-show">{article.title}</h1>
                    <p>{article.email}</p>
                    <div className="claps-comments-box">
                        <p>Clap!</p>
                        {(article.userId === currentUserId) && 
                            <div className="edit-delete">
                                <p id="edit">Edit</p>
                                <p>Delete</p>
                            </div>
                        }
                    </div>
                    <p className="article-show-body">{article.body}</p>
                </div>
            </div>
        </>
    )
}