import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle } from '../../store/articlesReducer';
import NavBar from "../NavBar";
import { useHistory } from "react-router-dom";
import "./createarticle.css"
import ContentEditable from 'react-contenteditable';

export default function CreateArticle () {
    const [title, setTitle] = useState('Title');
    const [body, setBody] = useState('Tell Your Story');
    const [userHighlight, setUserHighlight] = useState('none')
    const [highlightPosition, setHighlightPosition] = useState([])
    const [stateSelection, setStateSelection] = useState()
    const [boldedTextSnippets, setBoldedTextSnippets] = useState([])
    const currentUserId = useSelector(state => Object.values(state.users)[0].id)
    
    let history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(createArticle({article: {body, title, user_id: currentUserId}}))

        setTitle('');
        setBody('');

        history.push('/')
    };

    function onTitleChange(e) { // if title includes "Title" it will delete the body
        if (title === "Title" ) {
            setTitle('')
        } else {
            setTitle(e.target.value)
            e.target.classList.add("user-touched")
        }
        
    }

    function onBodyChange(e) {
        if (body === "Tell Your Story"){
            setBody('')
        } else {
            setBody(e.target.value)
        }
    }

    function onMouseUp (e) {
        const selection = window.getSelection()
        const highlightedText = selection.toString()
        if (highlightedText.length > 0 && selection.anchorNode.parentElement.id !== "bold-button") {
            setUserHighlight("block")
            setHighlightPosition([e.clientX, e.clientY])
            setStateSelection(selection)
        }
    }

    function onMouseDown (e) {
        setUserHighlight("none")
    }

    let color 

    if (body !== "Tell Your Story") {
        color = "black"
    }

    function onBoldClick () {

    }

    // useEffect(() => {
    //     boldedTextSnippets.forEach(snippet => {
    //         snippet.range.deleteContents()
    //         snippet.range.insertNode(snippet.boldElement)
    //     })
    // },[body])

    return (
        <>
            <div className='dropdown' style={{
                display: userHighlight,   
            }}>
                <div className='highlight-menu'
                    style={{position: 'absolute', 
                    left: highlightPosition[0] - 50, 
                    top: highlightPosition[1] - 75}}>
                    <div className='inside-menu'>
                        <button id='underline-button'>U</button>
                        <button id='bold-button' onClick={onBoldClick}>B</button>
                    </div>
                </div>
            </div>
        <NavBar />
        <div className='create-wrapper' 
        onMouseDown={onMouseDown}
        onKeyDown={onMouseDown}>
            <div className='create'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <input
                        type="text"
                        id="create-title"
                        value={title}
                        onChange={onTitleChange}
                    />
                    </div>
                    <div>
                    <ContentEditable 
                        id="body"
                        html={body}
                        onChange={onBodyChange}
                        onMouseUp={onMouseUp}
                        style={{color: color}}
                    />
                    <button className="auth-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

        <div>
      
 
    </div>
      </>
    );
}