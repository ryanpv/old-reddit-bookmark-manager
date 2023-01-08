import Pagination from 'layouts/Pagination';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import submitBookmark from '../../views/AllBookmarks'
import { PostModal } from 'components/Modals/PostModal';
import { Button } from 'react-bootstrap';

export default function SearchResults() {
  const { searchResponse, currentPage, categories } = useAuth();
  const baseUrl = 'https://www.reddit.com'
  const [postsPerPage, setPostsPerPage] = React.useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResponse?.slice(indexOfFirstPost, indexOfLastPost);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const [postData, setPostData] = React.useState({})
  const [postItem, setPostItem] = React.useState(
    {
    categoryName: "",
    categoryId: ""
   })
  
const SearchResultData = (props) => {
  
  return (
    <tr>
      <td>{ props.searchResult.categoryName ? props.searchResult.categoryName : <p>N/A</p> }</td>
      <td>
      {props.searchResult.pathName ? <Link to={ {pathname: `${baseUrl}${props.searchResult.pathName}`} } target="_blank" onClick={() => alert('opening new tab')}>
          { props.searchResult.title || props.searchResult.link_title }
          </Link> : 
          <Link to={ {pathname: `${baseUrl}${props.searchResult.permalink}`} } target="_blank" onClick={() => alert('opening new tab')}>
          { props.searchResult.title || props.searchResult.link_title }
          </Link>}
      </td>
      <td>{ !props.searchResult.categoryName ? 
              <Button variant="outline-primary" onClick={() => btnClick({ name: props.listItem.name, pathname: props.listItem.permalink, title: props.listItem.title,
                author: props.listItem.author, subreddit: props.listItem.subreddit_name_prefixed, body: props.listItem.body, link_title: props.listItem.link_title, 
                over_18: props.listItem.over_18 })}
                >+</Button> : null
      }</td>
    </tr>
  )
}

const btnClick = async(value) => { // btn click will store the value into state, which we can then use to pass info to submitBookmark()
  await setShow(show => !show);
  await setPostData(value);
}

const displaySearchResult = () => {
  if (currentPosts.length > 0) {
  return currentPosts.map(searchResult => {
    return (
        <SearchResultData searchResult={searchResult} key={searchResult._id} />
    )
  }
)} 
}

  return (
    <>
    <h2>Search Results</h2>

          {searchResponse.length > 0 ? 
    <table className='table table-striped' style={{ marginTop: 20, border: "1px solid black" }}>
        <thead>
            <tr>
              <th style={{ margin: 10, border: "1px solid black", padding: "10px 10px" }}>Category</th>
              <th style={{ margin: 20, border: "1px solid black", padding: "10px 10px" }}>Bookmarks</th>
            </tr>
        </thead>
        <tbody>
          { displaySearchResult() } 
          </tbody>
      </table>
          : <h2>No results</h2>}

    <div>
      <Pagination postsPerPage={ postsPerPage } totalPosts={ searchResponse.length } />
    </div>

    <datalist id='categoryName'>
      { categories?.map(results => { return (<option key={results._id}>{results.categoryName}</option> ) }) }
    </datalist>

    <div>
    <PostModal show={show} handleClose={handleClose} list={"categoryName"} submitBookmark={submitBookmark} postItem={postItem} setPostItem={setPostItem} 
      postData={postData} />
    </div>
    
    </>
  )
}
