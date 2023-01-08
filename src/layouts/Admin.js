import React, { useMemo } from "react";
import { useLocation, Route, Switch, useParams } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import NewNavbar from "components/Navbars/NewNavbar"
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import dashboardRoutes from "routes.js"; // importing the routing templates - can change this variable name to anything
import CategoryContent from "components/Sidebar/categoryContent";
import {UserContext} from "../components/Sidebar/UserContext"
import { AuthProvider } from "contexts/AuthContext";
import ForgotPassword from "../ForgotPassword"
import SearchResults from "../components/Navbars/SearchResults"

import { useAuth } from "contexts/AuthContext";
import { UserProvider } from "../components/Sidebar/UserContext";
import { auth } from "../firebase";



function Admin() {
  const [image, setImage] = React.useState();
  const [color, setColor] = React.useState("blue");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const [token, setToken] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [tokauth, setTokAuth] = React.useState(false || window.localStorage.getItem('tokauth') === 'true')
  const { categories, setCategories, categoryIdData } = useAuth();


  // useMemo will return specificially these values (like caching) without the need to rerender. Will only rerender when the dependencies change [], just like useEffect
  // beneficial because every rerender calls all functions again. with useMemo it "caches" the current specified unchanged values
  // good for values that dont change often
  // const value = useMemo(() => ({ user, setUser}), [user, setUser])
  // const cats = useMemo(() => ({ categories, setCategories }), [categories, setCategories])



  const getRoutes = (routes) => {

    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        console.log("some error");
        return null;
      }
    });
  };

  React.useEffect(() => {
    async function getTokenFunc() {
    const unsubscribe = await auth.onAuthStateChanged(appUser => {
      if (appUser) {
        setTokAuth(true)
        window.localStorage.setItem('tokauth', 'true')
        auth.currentUser.getIdToken().then(function(idToken) {
        setToken(idToken)
        setLoading(false)
        })
      }

    })
    return unsubscribe }
    getTokenFunc()
  }, [])

  // React.useEffect(() => {
  //   async function getCategoryList(token) {
  //     if(token) {
  //     // console.log("localStorage token " , token);
  //     const response = await fetch("http://localhost:4554/categorylist", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     const categoryRecords = await response.json();
  //     // console.log(categoryRecords);
  //     await setCategories(categoryRecords)
  //   } else { 
  //   console.log("not logged in/token not fetched yet") 
  //   }
  // } 
  //   getCategoryList(token)
  // }, [token])

////////////////////////////////////////////
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainPanel.current.scrollTop = 0; ???
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

//////////////////////////////////////////////

  return (
    <>
      {/* <AuthProvider> */}
        <UserProvider>
      {/* <UserContext.Provider value={content}> */}

      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={dashboardRoutes} 
        categories={categories} setCategories={setCategories} />
        <div className="main-panel" ref={mainPanel}>
          {/* <AdminNavbar /> */}
          <NewNavbar />
          <div className="content">
            <Switch>
              {getRoutes(dashboardRoutes)}
            </Switch>

            <Route path="/admin/forgot-password" render={() => <ForgotPassword />} />
            <Route path="/admin/search-results" render={() => <SearchResults />} />

            { token ? <Route path="/admin/category/:params" render={(key) => <CategoryContent />} />
             : <p>UNAUTHORIZED / PLEASE LOG IN</p> }
            
            
          </div>
          <Footer />
            {/* <CategoryContent /> */}
        </div>
      </div>
            {/* </UserContext.Provider> */}
            </UserProvider>
        {/* </AuthProvider> */}
    </>
  );
}

export default Admin;
