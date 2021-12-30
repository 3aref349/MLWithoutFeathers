//
// ─── REACT ──────────────────────────────────────────────────────────────────────
//

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import "./App.css";
import { MediaContextProvider } from "./utilities/Artsy";

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//
import Navbar from "./shared/Navbar";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


//
// ─── CUSTOM ROUTES ──────────────────────────────────────────────────────────────
//

import RouteUser from "./routes/RouterUser";
import RouteGuest from "./routes/RouteGuest";

import Landing from "./components/Landing";


//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { loadUser } from "./redux/auth";
import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact"


function App() {
  const dispatch = useDispatch();
  // ────────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Router>
      <MediaContextProvider>
        <Navbar>
          <Switch>
            {/* NORMAL ROUTES */}
            <Route path="/" component={Landing} exact />
            {/* GUEST ROUTES */}
            <RouteGuest path="/login" component={Login} exact />
            <RouteGuest path="/register" component={Register} exact />

            {/* USER ROUTES */}
            <RouteUser path="/mycontacts" component={Contacts} exact />
            <RouteUser path="/addcontacts" component={AddContact} exact />

          </Switch>
        </Navbar>
      </MediaContextProvider>
    </Router>
  );
}

export default App;
