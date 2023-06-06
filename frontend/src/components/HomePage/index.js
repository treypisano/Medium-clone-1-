import ArticleList from "../ArticleList";
import BottomHalf from "../BottomHalf";
import NavBar from "../NavBar";

export default function HomePage({ loggedIn }) {
    return (
        <>
            <NavBar loggedIn={ loggedIn }/>
            <BottomHalf loggedIn={ loggedIn }/>
        </>
    )
}