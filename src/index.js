import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../src/assets/css/light-bootstrap-dashboard-react.css"

import AdminLayout from "layouts/Admin.js";
import LogCallback from "views/LogCallback.js"
import CategoryContent from "components/Sidebar/categoryContent";
import { AuthProvider } from "contexts/AuthContext";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
  <BrowserRouter>

    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect exact from="/" to="/admin/dashboard" />
      <Route path="/log_callback" render={() => <LogCallback />} />
      {/* <Redirect exact from="/" to="/admin/dashboard" /> */}
      {/* <Route path="/admin/:title" render={() => <CategoryContent categoryContent={categoryContent}/>} /> */}

    </Switch>
  </BrowserRouter>
  </AuthProvider>
);
