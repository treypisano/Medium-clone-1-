import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { editArticle, fetchArticles, recieveClap } from "../../store/articlesReducer"
import { deleteArticle } from "../../store/articlesReducer"
import spinningGif from "../Splash/output-onlinegiftools.gif"
import ContentEditable from 'react-contenteditable';
import CreateComment from "../CreateComment/index"
import  hand  from './hand.png'
import  comment  from './comment.png'
import "./showpage.css"
import NavBar from "../NavBar"
import CommentIndex from "../CommentIndex"
import { csrfFetch, recieveFollow, reduxRemoveFollow } from "../../store/usersReducer"

export default function ShowPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [editEnabled, setEditEnabled] = useState(false)
    const [clapNum, setClapNum] = useState(0)
    const [commentNum, setCommentNum] = useState(0)
    const [following, setFollowing] = useState(false)
    const { articleId } = useParams()
    const currentUserId = useSelector(state => Object.values(state.users)[0]?.id)
    const currentUser = useSelector(state => Object.values(state.users)[0])
    const article = useSelector(function(state) {
        return state.articles[articleId]
    })
    const claps = useSelector((state) => {
        if (state.articles.length === 0) {
            return state.articles[articleId].claps
        }
    })
    const [body, setBody] = useState("")

    useEffect(() => {
        dispatch(fetchArticles())
        .then((articles) => {
            setBody(articles[articleId].body) 
            setClapNum(articles[articleId].claps.length)
            if (articles[articleId].comments) {
                setCommentNum(Object.keys(articles[articleId].comments).length)
            }
            setInitialFollowing(articles[articleId])
        })
    }, []) 

    if (!article) {
        return (
            <div>Loading...</div>
        )
    } 

    function setInitialFollowing(article) {
        const authorId = article.userId
        if (currentUser) { // If signed in
            const followedUsers = currentUser.followedUsers
            if (followedUsers) { // If you are following anyone
                if (followedUsers[authorId]) {
                    setFollowing(true)
                }
        }  
        } else {
            setFollowing(false)
        }
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
    
    function handleClapClick(e) {
        dispatch(recieveClap({clap: {user_id: currentUserId, article_id: articleId}}))

        setClapNum(clapNum + 1)
    }

    function handleFollowClick(e) {
        if (e.target.innerHTML === "Follow!") {
            addFollow()
        } else if (e.target.innerHTML === "Following!"){
            removeFollow()
        }
    }

    async function addFollow() {
        const res = await csrfFetch('/api/follows', {method: 'POST', 
        body: JSON.stringify({follow: {
            follower_id: currentUserId,
            followed_id: article.userId
        }})})
        const data = await res.json()
        if (!data.errors) {
            setFollowing(true)
            dispatch(recieveFollow(data))
        }
    }

    async function removeFollow() {
        const res = await csrfFetch(`/api/follows/${article.userId}`, {method: 'DELETE'})
        const data = await res.json()
        if (!data.errors) {
            setFollowing(false)
            dispatch(reduxRemoveFollow(data))
        }
    }
    // body && ---- Simply means if article isn't loaded yet
    return (
        <>
            <NavBar style="nav-bar-show-page"></NavBar>
            <div className="article-wrapper">
                <div className="article-show">
                    <h1 className="article-title-show">{article.title}</h1>
                    <div className="email-and-follow">
                    <p>{article.email}</p>
                    {currentUser && <p onClick={handleFollowClick}>{following ? <>Following!</> : <>Follow!</>}</p>}
                    </div>
                    {body && <div className="claps-comments-box"> 
                        <div className="claps-comments">
                            <div className="claps">
                                <img class="clap" src={hand} onClick={handleClapClick} ></img>
                                <p>{clapNum}</p>
                            </div>
                            <div className="claps" id="comment-display">
                                <img className="clap" src={comment}></img>
                                <p>{commentNum}</p>
                            </div>
                        </div>
                        {(article.userId === currentUserId) && 
                            <div className="edit-delete">
                                <p id="edit" onClick={handleEdit}>Edit</p>
                                <p onClick={handleDelete}>Delete</p>
                            </div>
                        }
                    </div>}
                    <form className="edit-form">
                        {body ? <ContentEditable 
                        id="body"
                        className="article-show-body"
                        html={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{color: "black"}}
                        disabled={!editEnabled}/> : <img src={spinningGif} className="loading-gif"></img>}
                        {editEnabled &&
                            <button className="auth-button" type="submit" onClick={handleUpdateButton}>Update</button>
                        }
                    </form>
                    {body && <><CreateComment />
                    <CommentIndex /></>}
                </div>
            </div>
        </>
    )
}