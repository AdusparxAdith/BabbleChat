import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute";

import Register from "./components/Register/Register";
import Chat from "./components/Chat/Chat";
import NavBar from "./components/Global/NavBar";
import { UserContext } from "./components/Global/UserContext";

const App = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PrivateRoute path="/" component={NavBar} />
          <Switch>
            <Route path="/login" exact component={Register} />
            <PrivateRoute path="/chat" component={Chat} />
            <Redirect from="*" to="/chat" />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
