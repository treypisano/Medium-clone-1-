import TrendingBar from "../TrendingBar"
import ArticleList from "../ArticleList"
import { useSelector } from 'react-redux';

function Tag ({tagName}) {
    return (
            <p className='tag'>{tagName}</p>
    )
}

export default function BottomHalf ( {loggedIn} ) {
    const sessionUser = useSelector(state => state.users);

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
                            <Tag tagName="Art" />
                            <Tag tagName="Science" />
                            <Tag tagName="Math" />
                            <Tag tagName="Productivity" />
                            <Tag tagName="Lifestyle" />
                            <Tag tagName="Fitness" />
                            <Tag tagName="Driving" />
                            <Tag tagName="Career" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

