import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux"
import { fetchArticles } from "../../store/articlesReducer"
import "./showpage.css"
import NavBar from "../NavBar"

export default function ShowPage() {
    const { articleId } = useParams()
    const article = useSelector(function(state) {
        return state.articles[articleId]
    })

    return (
        <>
            <NavBar></NavBar>
            <div className="article-wrapper">
                <div className="article-show">
                    <h1 className="article-title-show">{article.title}</h1>
                    <p>{article.email}</p>
                    <p>{article.body}</p>
                </div>
            </div>
        </>
    )
}