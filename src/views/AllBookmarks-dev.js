import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import CategoryContent from '../components/Sidebar/categoryContent';
// import { UserContext } from '../components/Sidebar/UserContext';

export default function AllBookmarksDev() {
  // const { CategoryContent } = useContext(UserContext)
  const [list, setList] = React.useState([
    { "bookmarkItem":"google.ca",
      _id: '1asdf'},
      { "bookmarkItem":"youtube.com",
      _id: '2greega'},
      { "bookmarkItem":"amazon.ca",
      _id: '3agraggre'},
      { "bookmarkItem":"freecodecamp.com",
      _id: '4aafv'},
      { "bookmarkItem":"stackoverflow.com",
      _id: '5adsf'},
  ]);

  const FullList = (props) => (
    <tr>
      <td>{ props.listItem._id }</td>
      <td>
        <Link to={{pathname: `https://${props.listItem.bookmarkItem}`}} target="_blank" onClick={() => alert('opening new tab')}>
        { props.listItem.bookmarkItem }
        </Link>
        </td>
    </tr>
  );

    // function alert() {
    //  alert('opening new tab')
    // }

  function getFullList() {
    return list.map((listItem) => {
      return (<>
        <FullList listItem={listItem} key={listItem._id} />
        {/* <Link to={{pathname: `https://${listItem.bookmarkItem}`}} target="_blank">Go to link</Link> */}
      </>
      )
    });
  };
  

  return (
    <>
    
    <input></input>
    <div>
      <h3>List of All Saved Bookmarks</h3>        
      <table className='table table-striped' style={{ marginTop: 20, border: "1px solid black" }}>
        <thead>
            <tr>
              <th style={{ margin: 20, border: "1px solid black", padding: "10px 10px" }}>ID</th>
              <th style={{ margin: 20, border: "1px solid black", padding: "10px 10px" }}>Bookmarks</th>
            </tr>
        </thead>
        <tbody>{getFullList()}</tbody>
      </table>
    </div>
    </>
  )
}
