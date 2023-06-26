import { createComment } from "../../store/articlesReducer"
import { useState } from "react"

export default function CreateComment() {
    const [body, setBody] = useState('')
    const [label, setLabel] = useState('Post')

    const handleSubmit = (e) => {
        // debugger

        console.log(body)
    }

    return (
        <div className="new-comment">
            <p>Put a Comment Here!</p>
            <form>
                <input type="textbox" onChange={(e) => setBody(e.target.value)}></input>
                <input type="button" value={label} onClick={handleSubmit}></input>
            </form>
        </div>
    )
}