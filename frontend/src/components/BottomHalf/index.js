import TrendingBar from "../TrendingBar"
import ArticleList from "../ArticleList"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Tag ({tagName}) {
    return (
            <p className='tag'>{tagName}</p>
    )
}

export default function BottomHalf ( {loggedIn} ) {
    const sessionUser = useSelector(state => state.users);
    const articles = useSelector(state => Object.keys(state.articles))

    return (
        <div className='whole-bottom-half'>
            {
                !loggedIn &&
                <TrendingBar />
            }
            <div className='bottom-half default-width'>
                <div className='bottom-half-grid'>
                    <div className='left-side-grid'>
                        <ArticleList />
                    </div>
                    <div className='right-side-grid'>
                        <div className='right-side-grid-inside'>
                        <h2 className='tags-title'>Discover more of what matters to you</h2>
                            <div className='tags'>
                            <Link to={`articles/${articles[0]}`}>
                                <Tag tagName="Art" />
                            </Link>
                            <Link to={`articles/${articles[1]}`}>
                                <Tag tagName="Science" />
                            </Link>
                            <Link to={`articles/${articles[2]}`}>
                                <Tag tagName="Math" />
                            </Link>
                            <Link to={`articles/${articles[3]}`}>
                                <Tag tagName="Productivity" />
                            </Link>
                            <Link to={`articles/${articles[4]}`}>
                                <Tag tagName="Lifestyle" />
                            </Link>
                            <Link to={`articles/${articles[5]}`}>
                                <Tag tagName="Fitness" />
                            </Link>
                            <Link to={`articles/${articles[6]}`}>
                                <Tag tagName="Driving" />
                            </Link>
                            <Link to={`articles/${articles[7]}`}>
                                <Tag tagName="Career" />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

