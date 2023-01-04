import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Signup from "../src/components/Sidebar/Signup"
import Login from "login";
import AllBookmarksDev from "views/AllBookmarks-dev"
import AllBookmarks from "views/AllBookmarks"

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/all-bookmarks-dev",
  //   name: "All Bookmarks-dev",
  //   icon: "nc-icon nc-layers-3",
  //   component: AllBookmarksDev,
  //   layout: "/admin"
  // },
  {
    path: "/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/all-bookmarks",
    name: "All Bookmarks",
    icon: "nc-icon nc-layers-3",
    component: AllBookmarks,
    layout: "/admin"
  },
  {
    path: "/signup",
    name: "Sign Up",
    icon: "",
    component: Signup,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Log In",
    icon: "",
    component: Login,
    layout: "/admin"
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
