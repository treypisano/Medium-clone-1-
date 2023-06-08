# Premium

Premium is a full stack clone of Medium, built using Ruby On Rails, Redux, and React.

This clone includes some of the features from the actual Medium, including user authentication, creating/updating/deleting posts, as well as "clapping" (liking) posts.

## Functionality and MVPS

- Have a splash page which has a Navigation Bar, a list of articles, and proper styling
- A user can sign in/up, using credentials or a demo login. 
- Error handinling on the user authentication
- A user can "clap" and "unclap" articles
- A user can edit and delete the posts that they have made

![image](https://github.com/treypisano/Medium-clone-1-/assets/126501514/d9e418c3-b941-47e5-9996-a08a922cd7f3)

## Making the Splash Page

- The Medium splash page uses elegant styling and design to display sample articles and login capabilities
- The articles that are shown to the user are the most recent, and include information about the user and the article
- On intial render, 25 articles are fetched from the database and stored in the Redux state
- The splash page is dynamic, redirecting to a different version of the page if the user is logged in 

The logic for fetching the articles on initial load
` const articles = useSelector(state => Object.values(state.articles).reverse())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])
`

## Error Handling
- Errors are stored in a Redux state
- When the submit button is pressed, the backend will render any errors as JSON, which will then be sent to the front end
- This is done inside of a thunk action creator, which will dispatch an action that adds these errors to the state
` 
if (data.errors){
        dispatch({ type: ADD_ERROR, payload: data }) // if theres errors, add to state
    } else {
        dispatch(receiveUser(data.user))
        dispatch({ type: CLOSED_MODEL, payload: "closing modal" })
    }
 `
