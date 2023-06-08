import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { editArticle, fetchArticles } from "../../store/articlesReducer"
import { deleteArticle } from "../../store/articlesReducer"
import ContentEditable from 'react-contenteditable';
import "./showpage.css"
import NavBar from "../NavBar"

export default function ShowPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editEnabled, setEditEnabled] = useState(false)
    const { articleId } = useParams()
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
    const article = useSelector(function(state) {
        return state.articles[articleId]
    })
    const [body, setBody] = useState("")

    useEffect(() => {
        dispatch(fetchArticles())
        .then((articles) => {
            setBody(articles[articleId].body) 
        })
    }, []) 

    if (!article) {
        return (
            <div>Loading...</div>
        )
    } 
    
    function handleDelete(e) {
        e.preventDefault();

        dispatch(deleteArticle(articleId))    
        history.push('/')
    }

    function handleEdit () {
        setEditEnabled(!editEnabled)

        if (!editEnabled) {
            setBody(article.body)
        }
    }

    function handleUpdateButton() {
        article.body = body
        dispatch(editArticle(article))

        history.push('/')
    }  

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
                                <p id="edit" onClick={handleEdit}>Edit</p>
                                <p onClick={handleDelete}>Delete</p>
                            </div>
                        }
                    </div>
                    {/* {editEnabled ? 
                    <form>
                        <button className="auth-button" type="submit" onClick={handleUpdateButton}>Update</button>
                        <ContentEditable 
                        id="body"
                        html={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{color: "black"}}/>
                    </form>
                    :   
                        <p className="article-show-body" >{article.body}</p>
                    } */}
                    <form>
                        {editEnabled &&
                            <button className="auth-button" type="submit" onClick={handleUpdateButton}>Update</button>
                        }
                        <ContentEditable 
                        id="body"
                        className="article-show-body"
                        html={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{color: "black"}}
                        disabled={!editEnabled}/>
                    </form>
                </div>
            </div>
        </>
    )
}